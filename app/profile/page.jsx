"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const myProfile = () => {
    const [posts, setPosts] = useState(null);
    const router = useRouter();
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/");
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
            const response = await fetch(`/api/user/${session?.user.id}/posts`);
            const responsePosts = await response.json();
            setPosts(responsePosts);
        };

        // if the user is logged in, fetch the posts
        if (session?.user.id) {
            fetchPosts();
        }
    }, []);

    return (
        <Profile
            name="My"
            desc={
                status === "authenticated"
                    ? posts?.length
                        ? "Welcome to your profile! Here are your posts."
                        : "Welcome to your profile! Looks like you haven't made any posts. Try posting a new prompt!"
                    : ""
            }
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        ></Profile>
    );
};

export default myProfile;
