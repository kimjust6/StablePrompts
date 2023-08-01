"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompt = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [post, setPost] = useState({ prompt: "", tag: "" });
    const [submitting, setSubmitting] = useState(false);

    const handleCreatePrompt = async (e) => {
        // prevent the page from reloading
        e.preventDefault();
        setSubmitting(true);

        // send POST to local api passing in data
        try {
            const response = await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
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
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={handleCreatePrompt}
        ></Form>
    );
};

export default CreatePrompt;