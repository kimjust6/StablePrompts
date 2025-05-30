"use client";

import Loading from "@/components/Loading";
import Posts from "@/components/Profile";
import UserDNE from "@/components/UserDNE";
import { getPromptByCreatorId, getUserById } from "@/utils/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";

const userPage = props => {
  const params = use(props.params);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [firstName, setFirstName] = useState<string>("");
  const [noUser, setNoUser] = useState<boolean>(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated" && session?.user.id == params.id) {
      router.push("/profile");
    }

    const fetchPosts = async () => {
      try {
        const response = await getPromptByCreatorId(params.id);
        const responsePosts = JSON.parse(response);
        if (responsePosts.length) {
          setFirstName(responsePosts[0].creator.fName);
          setPosts(responsePosts);
        } else {
          const user = await getUserById(params.id);
          const parsedUser = JSON.parse(user);
          if (parsedUser?.fName ?? true) {
            setNoUser(true);
          } else {
            setFirstName(parsedUser.fName);
          }
        }
        setIsLoading(false);
      } catch (err) {
        setNoUser(true);
      }
    };

    fetchPosts();
  }, [status]);

  return noUser ? (
    <UserDNE />
  ) : status === "loading" || isLoading ? (
    <Loading />
  ) : (
    <Posts
      name={`${firstName}'s`}
      desc={
        posts?.length
          ? `Here are ${firstName}'s Prompts.`
          : `Looks like ${firstName} hasn't posted any prompts.`
      }
      data={posts}
      handleDelete={null}
      handleEdit={null}
    />
  );
};

export default userPage;
