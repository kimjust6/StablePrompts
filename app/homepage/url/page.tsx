"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getStableDiffusionAPIMongoDB,
  setStableDiffusionAPIMongoDB,
} from "@/utils/actions";
import { useEffect, useState } from "react";

const SetUrl = () => {
  const [Url, setUrl] = useState<string>("");

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
    <section className="mt-20 w-96 flex justify-center items-center gap-4">
      <Input
        type="text"
        placeholder="Input to override the stable diffusion API"
        value={Url}
        onChange={(event) => {
          setUrl(event.target.value);
        }}
      />
      <Button
        onClick={() => {
          setStableDiffusionAPIMongoDB(Url);
        }}>
        Submit
      </Button>
    </section>
  );
};

export default SetUrl;
