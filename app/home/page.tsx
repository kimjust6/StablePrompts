import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Root = () => {
  return (
    <section className="flex flex-col items-center mt-[20vh]">
      <h1 className="head_text text-center">
        Welcome to
        <br className="max-md:hidden" />
        <span className="purple_gradient "> Stable Prompts</span>
      </h1>
      <p className="desc text-center">
        Explore a curated collection of prompts for stable diffusion
      </p>
      <Link href="/homepage" className="mt-10">
        <Button>Explore Prompts</Button>
      </Link>
    </section>
  );
};

export default Root;
