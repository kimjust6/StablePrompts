"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const UpdatePrompt = () => {
    // get url parameters

    const router = useRouter();
    const searchParams = useSearchParams();
    const postId = searchParams.get("id");
    const [post, setPost] = useState({ prompt: "", tag: "" });
    const [submitting, setSubmitting] = useState(false);

    // on load, call the api to get post data
    useEffect(() => {
        const getPromptDetails = async () => {
            // on load, get the post data
            const response = await fetch(`/api/prompt/${postId}`);
            const data = await response.json();
            setPost(data);
        };
        if (postId) {
            getPromptDetails();
        }
    }, [postId]);

    const handleUpdatePrompt = async (e) => {
        // prevent the page from reloading
        e.preventDefault();
        setSubmitting(true);

        if (post.tag.substring(0,1) != "#") {
            post.tag = "#" + post.tag;
        }
        // send PATCH to local api passing to edit
        try {
            const response = await fetch(`/api/prompt/${postId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            });

            // check if response was good
            if (response.ok) {
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={handleUpdatePrompt}
        ></Form>
    );
};

export default UpdatePrompt;
