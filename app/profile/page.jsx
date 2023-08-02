"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const myProfile = () => {
    const [posts, setPosts] = useState([]);
    const { data: session } = useSession();
    const router = useRouter();

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
            desc="Welcome to your profile! Here are your posts."
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        ></Profile>
    );
};

export default myProfile;
