"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface PromptCardProps {
  key: String;
  post: any;
  handleTagClick: any;
  handleDelete: any;
  handleEdit: any;
}

const PromptCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: PromptCardProps) => {
  const [copiedPost, setCopiedPost] = useState("");
  const { data: session, status } = useSession();
  // get path of url
  const pathName = usePathname();
  const router = useRouter();
  const handleCopy = (prompt: string) => {
    // set state to post.prompt
    setCopiedPost(prompt);
    // set clipboard to prompt
    navigator.clipboard.writeText(prompt);

    // after three seconds, reset the state of copiedPost
    setTimeout(() => setCopiedPost(""), 2000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post?.creator?.image}
            alt="userImage"
            width={40}
            height={40}
            className="rounded-full object-contain"></Image>
          <div className="rounded-full object-contain">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post?.creator?.fName} {post?.creator?.lName}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post?.creator?.email}
            </p>
          </div>
        </div>
        <div
          className="copy_btn"
          onClick={() => {
            handleCopy(post.prompt);
          }}>
          <Image
            width={12}
            height={12}
            className="text-violet-400"
            alt="copy icon"
            src={
              copiedPost === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }></Image>
        </div>
      </div>
      <p className="my-4 font-satoshi text-md text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-md text-violet-400 hover:text-violet-600 cursor-pointer"
        onClick={() => {
          // check if handletagclick exists, and call it if it does
          handleTagClick && handleTagClick(post.tag);
        }}>
        {post.tag}
      </p>
      {/* check if the user is viewing own profile */}
      {session?.user.id === post?.creator?._id && pathName === "/profile" && (
        <div className="mt-3 flex justify-center items-center gap-6 border-t border-gray-300">
          {session?.user?.id}
          <p
            className="mt-3 font-inter  text-sm cursor-pointer hover:text-violet-700 text-violet-500"
            onClick={() => {
              handleEdit(post);
            }}>
            Edit
          </p>
          <p
            className="mt-3 font-inter text-sm cursor-pointer hover:text-red-700 text-red-500"
            onClick={() => {
              handleDelete(post);
            }}>
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
