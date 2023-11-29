"use client";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  generateImage,
  getStableDiffusionAPIMongoDB,
  setStableDiffusionAPIMongoDB,
} from "@/utils/actions";
import Image from "next/image";
import { useEffect, useState } from "react";

const SetUrl = () => {
  const [Url, setUrl] = useState<string>("");
  const [promptText, setPromptText] = useState<string>("");
  const [myImage, setMyImage] = useState("");
  // const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);

  useEffect(() => {
    const getAPI = async () => {
      const response = await getStableDiffusionAPIMongoDB();
      if (response) {
        const parsedUrl = (JSON.parse(response)?.url ?? "") as string;
        setUrl(parsedUrl);
      }
    };
    getAPI();
  }, []);
  return (
    <section className="mt-20 flex flex-col justify-center items-center gap-4">
      <form
        className="flex gap-4 w-96"
        onSubmit={async (event) => {
          event.preventDefault();
          setStableDiffusionAPIMongoDB(Url);
        }}>
        <Input
          type="text"
          placeholder="Input to override the stable diffusion API"
          value={Url}
          onChange={(event) => {
            setUrl(event.target.value);
          }}
        />
        <Button>Submit</Button>
      </form>
      <form
        className="flex gap-4 w-96"
        onSubmit={async (event) => {
          event.preventDefault();
          setMyImage(null);
          const response = await generateImage(promptText);
          setMyImage(response);
        }}>
        <Input
          type="text"
          value={promptText}
          onChange={(event) => {
            setPromptText(event.target.value);
          }}
          placeholder="input text to generate image from stable diffusion API"
        />
        <Button type="submit">Generate Image</Button>
      </form>

      {myImage ? (
        <Image
          alt="ai generated image"
          width="512"
          height="512"
          src={`data:image/png;base64,${myImage}`}
        />
      ) : (
        myImage !== "" && <Loading />
      )}
    </section>
  );
};

export default SetUrl;
