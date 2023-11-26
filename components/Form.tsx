import Link from "next/link";
import { Button } from "@/components/ui/button";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="purple_gradient">{type} Prompt</span>
      </h1>
      <div className="desc text-left max-w-md">
        <span className="pt-3">
          Our imagination is the only limit to what we can hope to have in the
          future.
          <span className="font-satoshi font-bold text-secondary-foreground">
            {" "}
            - Charlies Kettering
          </span>
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full flex flex-col gap-7 glassmorphism">
        <label>
          <span className="font-satoshi font-semibold text-base text-foreground">
            Your Stable Diffusion Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => {
              setPost({ ...post, prompt: e.target.value });
            }}
            placeholder="Your prompt goes here..."
            required
            className="form_textarea"></textarea>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-foreground">
            Tags
          </span>
          <input
            value={post.tag}
            onChange={(e) => {
              setPost({ ...post, tag: e.target.value });
            }}
            placeholder="#YourTagGoesHere"
            required
            className="form_input"></input>
        </label>
        <div className="flex-end mx- mb-5 gap-4">
          <Link href="/">
            <Button type="button" variant="outline" size="lg">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            variant="outline"
            size="lg"
            className="bg-violet-600 hover:bg-violet-800 text-background"
            disabled={submitting}>
            {submitting ? "Submit..." : "Submit"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Form;
