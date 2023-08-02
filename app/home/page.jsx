import Feed from "@components/Feed";

const Home = () => {
    return (
        <div>
            <section className="w-full flex-center flex-col ">
                <h1 className="head_text text-center">
                    Find and Share
                    <br className="max-md:hidden" />
                    <span className="purple_gradient"> Stable Diffusion Prompts</span>
                </h1>
                <p className="desc text-center">
                    Find and share prompts for stable diffusion to create your own AI generated
                    images.
                </p>
                <Feed></Feed>
            </section>
        </div>
    );
};

export default Home;
