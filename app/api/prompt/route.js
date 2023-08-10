import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req) => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({}).populate("creator");

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        try {
            await connectToDB();
            const prompts = await Prompt.find({}).populate("creator");

            return new Response(JSON.stringify(prompts), { status: 200 });
        } catch (error2) {
            console.log(error2);
            return new Response("Error: Failed to retrieve prompts.", { status: 500 });
        }
    }
};
