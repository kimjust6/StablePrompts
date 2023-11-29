"use client";

import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/homepage");
    },
  });
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setSubmitting] = useState(false);
  const [url, setUrl] = useState("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleCreatePrompt = async (e) => {
    // prevent the page from reloading
    e.preventDefault();
    setSubmitting(true);

    if (post.tag.substring(0, 1) != "#") {
      post.tag = "#" + post.tag;
    }
    // send POST to local api passing in data
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
          url: url,
        }),
      });

      // check if response was good
      if (response.ok) {
        router.push("/homepage");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Post"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleCreatePrompt}
      url={url}
      setUrl={setUrl}
      isUploading={isUploading}
      setIsUploading={setIsUploading}
    />
  );
};

export default CreatePrompt;
