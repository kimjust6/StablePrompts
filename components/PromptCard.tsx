"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface PromptCardProps {
  key?: String;
  post: any;
  handleTagClick?: any;
  handleDelete?: any;
  handleEdit?: any;
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
    <Card className="prompt_card">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div className="flex w-full items-center gap-4">
            <Image
              src={post?.creator?.image}
              alt="userImage"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
            <div>
              <h3 className="font-semibold ">
                {post?.creator?.fName} {post?.creator?.lName}
              </h3>
              <p className="font-inter text-sm text-muted-foreground"></p>
              <CardDescription>{post?.creator?.email}</CardDescription>
            </div>
          </div>

          {copiedPost === post.prompt ? (
            <Check strokeWidth={2} className="copy_btn text-green-600" />
          ) : (
            <Copy
              strokeWidth={2}
              className="copy_btn text-violet-400 hover:text-violet-600"
              onClick={() => {
                handleCopy(post.prompt);
              }}
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-satoshi text-md text-foreground">{post.prompt}</p>
      </CardContent>
      <CardFooter className="flex flex-col w-full items-start">
        <p
          className="font-inter text-md text-violet-400 hover:text-violet-600 cursor-pointer -mt-4 -mb-2"
          onClick={() => {
            // check if handletagclick exists, and call it if it does
            handleTagClick && handleTagClick(post.tag);
          }}>
          {post.tag}
        </p>
        {session?.user.id === post?.creator?._id && pathName === "/profile" && (
          <div className="w-full ">
            <Separator className="mt-5 mb-2 " />
            <div className="flex w-full justify-center gap-10">
              <Button
                variant="link"
                className="text-card-foreground/90 -mb-5 -mt-1"
                onClick={() => {
                  handleEdit(post);
                }}>
                Edit
              </Button>
              <Button
                variant="link"
                className="text-destructive -mb-5 -mt-1 "
                onClick={() => {
                  handleDelete(post);
                }}>
                Delete
              </Button>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PromptCard;
