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
import { generateImage } from "@/utils/actions";
import Loading from "./Loading";

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
  const [myImage, setMyImage] = useState("");
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

  const profileClickHelper = () => {
    if (session?.user.id != post?.creator?._id) {
      router.push(`/profile/${post?.creator._id}`);
    } else {
      router.push(`/profile`);
    }
  };

  return (
    <Card className="prompt_card">
      <CardHeader>
        <CardTitle className="flex justify-between ">
          <div className="flex w-full items-center gap-4 ">
            <Image
              src={post?.creator?.image}
              alt="userImage"
              width={40}
              height={40}
              onClick={profileClickHelper}
              className="rounded-full object-contain cursor-pointer"
            />
            <div onClick={profileClickHelper} className="cursor-pointer">
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
          className={
            "font-inter text-md text-violet-500 -mt-4 -mb-2 " +
            (pathName === "/homepage"
              ? " hover:text-violet-700 hover:underline cursor-pointer"
              : "")
          }
          onClick={() => {
            // check if handletagclick exists, and call it if it does
            handleTagClick && handleTagClick(post.tag);
          }}>
          {post.tag}
        </p>
        {session?.user.id === post?.creator?._id && pathName === "/profile" ? (
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
                className="text-destructive dark:text-red-500 -mb-5 -mt-1 "
                onClick={() => {
                  handleDelete(post);
                }}>
                Delete
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full ">
            <Separator className="my-5  " />

            {myImage ? (
              <Image
                alt="ai generated image"
                width="512"
                height="512"
                src={`data:image/png;base64,${myImage}`}
              />
            ) : (
              myImage !== "" && (
                <div className="flex items-center justify-center max-h-64">
                  <Loading />
                </div>
              )
            )}
            <div className="flex w-full justify-center gap-10 mt-5 mb-3">
              <Button
                variant="ghost"
                className="text-card-foreground/90 -mb-5 -mt-1 border"
                onClick={async () => {
                  setMyImage(null);
                  const response = await generateImage(post.prompt);
                  setMyImage(response);
                }}>
                Generate Image
              </Button>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PromptCard;
