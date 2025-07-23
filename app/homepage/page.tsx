"use client";

import Feed from "@/components/Feed";
import { generate } from "@/utils/actions";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    let response;
    const data = async () => {
      response = await generate("");
      console.log(response);
    };
    data();
  }, []);

  return (
    <section className="flex w-full flex-col items-center">
      <h1 className="head_text text-center">
        Find and Share
        <br className="max-md:hidden" />
        <span className="purple_gradient"> Stable Diffusion Prompts</span>
      </h1>
      <p className="desc text-center">
        Sign in with Google to find and share prompts for stable diffusion.
        Share your AI generated images!
      </p>
      <Feed />
    </section>
  );
};

export default Home;
