"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const myProfile = () => {
    const [posts, setPosts] = useState([]);
    const { data: session } = useSession();
    
    const handleEdit = () => {};
    const handleDelete = async () => {};

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
            desc="Welcome to your profile!"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        ></Profile>
    );
};

export default myProfile;