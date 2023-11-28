"use client";

import Loading from "@/components/Loading";
import Posts from "@/components/Profile";
import UserDNE from "@/components/UserDNE";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const userPage = ({ params }) => {
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
        const response = await fetch(`/api/user/${params.id}/posts`, {
          cache: "no-store",
        });
        const responsePosts = await response.json();
        const userResponse = await fetch(`/api/user/${params.id}`, {
          cache: "no-store",
        });
        const parsedUser = await userResponse.json();
        setPosts(responsePosts);
        setFirstName(parsedUser.fName);
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
