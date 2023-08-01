import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// pass in url params as well
export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        // only get posts from creator with params.id
        const prompts = await Prompt.find({
            creator: params.id,
        }).populate("creator");

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error: Failed to retrieve prompts.", { status: 500 });
    }
};
