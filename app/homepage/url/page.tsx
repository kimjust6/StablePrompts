"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setStableDiffusionAPIMongoDB } from "@/utils/actions";
import { useState } from "react";

const SetUrl = () => {
  const [Url, setUrl] = useState<string>("");
  return (
    <section className="h-[60vh] w-96 flex justify-center items-center gap-4">
      <Input
        type="text"
        placeholder="Input to override the stable diffusion API"
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
