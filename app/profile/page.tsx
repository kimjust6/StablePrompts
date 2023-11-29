"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Posts from "@/components/Profile";
import Loading from "@/components/Loading";

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(true);
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/homepage");
    },
  });
  // method that handles edit post
  const handleEdit = (post) => {
    // redirect to route /update-prompt
    router.push(`/update-prompt?id=${post._id}`);
  };

  // method that handles delete
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        // updated the list of posts
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // on first load, get all the posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/user/${session?.user.id}/posts`, {
          cache: "no-store",
        });
        const responsePosts = await response.json();
        setPosts(responsePosts);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    // if the user is logged in, fetch the posts
    if (session?.user.id) {
      fetchPosts();
    }
  }, [status]);

  return status === "loading" || isLoading ? (
    <Loading />
  ) : (
    <Posts
      name="My"
      desc={
        posts?.length
          ? "Here are your Prompts."
          : "Looks like you haven't made any posts. Try posting a new prompt!"
      }
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
