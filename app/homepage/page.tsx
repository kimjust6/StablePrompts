"use client";

import Feed from "@/components/Feed";

const Home = () => {
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
