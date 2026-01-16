"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generateGeminiImageAndSaveToDb, getPromptImage } from "@/utils/actions";
import { Check, Copy } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { is } from "date-fns/locale";
import { IPrompt } from "@/utils/Interfaces";

interface PromptCardProps {
  post: IPrompt;
  handleTagClick?: (tag: string) => void;
  handleDelete?: (post: IPrompt) => void;
  handleEdit?: (post: IPrompt) => void;
}

const PromptCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: PromptCardProps) => {
  const [copiedPost, setCopiedPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const [myImage, setMyImage] = useState(post?.imageUrl || null);

  useEffect(() => {
    const fetchImage = async () => {
      if (!post.imageUrl && post._id) {
        setIsLoading(true);
        const image = await getPromptImage(post._id);
        if (image) {
          setMyImage(image);
        }
        setIsLoading(false);
      }
    };
    fetchImage();
  }, [post.imageUrl, post._id]);

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
        <CardTitle className="flex justify-between">
          <div className="flex w-full items-center gap-4">
            <Image
              src={post?.creator?.image}
              alt="userImage"
              width={40}
              height={40}
              onClick={profileClickHelper}
              className="cursor-pointer rounded-full object-contain"
            />
            <div onClick={profileClickHelper} className="cursor-pointer">
              <h3 className="font-semibold">
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
      <CardFooter className="flex w-full flex-col items-start">
        <p
          className={
            "font-inter text-md -mb-2 -mt-4 text-violet-500 " +
            (pathName === "/homepage"
              ? " cursor-pointer hover:text-violet-700 hover:underline"
              : "")
          }
          onClick={() => {
            // check if handletagclick exists, and call it if it does
            handleTagClick && handleTagClick(post.tag);
          }}>
          {post.tag}
        </p>
        {session?.user.id === post?.creator?._id && pathName === "/profile" ? (
          <div className="w-full">
            <Separator className="mb-2 mt-5" />
            <div className="flex w-full justify-center gap-10">
              <Button
                variant="link"
                className="-mb-5 -mt-1 text-card-foreground/90"
                onClick={() => {
                  handleEdit(post);
                }}>
                Edit
              </Button>
              <Button
                variant="link"
                className="-mb-5 -mt-1 text-destructive dark:text-red-500"
                onClick={() => {
                  handleDelete(post);
                }}>
                Delete
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <Separator className="mt-5" />
            {isLoading && (
              <div>
                <span className="items center mt-2 flex w-full justify-center text-muted-foreground">
                  This may take some time...
                </span>

                <span className="flex h-[14.1rem] w-full items-center justify-center">
                  <Loading />
                </span>
              </div>
            )}
            {!isLoading && myImage ? (
              <Image
                className="mt-4"
                alt="ai generated image"
                width="512"
                height="512"
                src={`data:image/png;base64,${myImage}`}
              // src={myImage}
              />
            ) : (
              <></>
            )}
            <div className="mb-3 mt-5 flex w-full justify-center gap-10">
              <Button
                variant="ghost"
                className="-mb-5 -mt-1 border text-card-foreground/90"
                onClick={async () => {
                  setMyImage(null);
                  setIsLoading(true);
                  const response = await generateGeminiImageAndSaveToDb(
                    post.prompt,
                    post._id.toString()
                  );
                  setMyImage(response);
                  setIsLoading(false);
                }}
                disabled={isLoading}>
                {myImage === "" ? (
                  "Generate Image"
                ) : myImage === null ? (
                  <>
                    {/* <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{" "} */}
                    Generating Image
                  </>
                ) : (
                  "Regenerate Image"
                )}
              </Button>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PromptCard;
