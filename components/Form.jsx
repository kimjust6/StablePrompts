import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {

    return (
        <section className="w-full max-w-full flex-start flex-col">
            <h1 className="head_text text-left">
                <span className="purple_gradient">{type} Prompt</span>
            </h1>
            <div className="desc text-left max-w-md">
                <span className="pt-3">
                    Our imagination is the only limit to what we can hope to have in the future.
                    <span className="font-satoshi font-bold text-gray-800">
                        {" "}
                        - Charlies Kettering
                    </span>
                </span>
            </div>

            <form
                onSubmit={handleSubmit}
                className="mt-10 w-full flex flex-col gap-7 glassmorphism"
            >
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Your Stable Diffusion Prompt
                    </span>
                    <textarea
                        value={post.prompt}
                        onChange={(e) => {
                            setPost({ ...post, prompt: e.target.value });
                        }}
                        placeholder="Your prompt goes here..."
                        required
                        className="form_textarea"
                    ></textarea>
                </label>
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">Tags</span>
                    <input
                        value={post.tag}
                        onChange={(e) => {
                            setPost({ ...post, tag: e.target.value });
                        }}
                        placeholder="#YourTagGoesHere"
                        required
                        className="form_input"
                    ></input>
                </label>
                <div className="flex-end mx- mb-5 gap-4">
                    <Link
                        href="/"
                        className="text-gray-500 hover:text-gray-800 hover:bg-gray-200 bg-gray-100 text-lg px-2 py-1.5 rounded-lg outline outline-1"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-5 py-1.5 text-lg hover:bg-violet-800 bg-violet-600 text-white rounded-lg font-semibold"
                    >
                        {submitting ? "Submit..." : "Submit"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Form;
