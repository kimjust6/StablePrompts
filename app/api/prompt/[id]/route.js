// id route with GET, PATCH, and DELETE

import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET
export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        // find singular prompt with id params.id
        const prompt = await Prompt.findById(params.id);

        // case where prompt does not exist
        if (!prompt) {
            return new Response("Prompt does not exist!", { status: 404 });
        }

        // success case
        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error: Failed to retrieve prompts.", { status: 500 });
    }
};

// PATCH
export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();

    try {
        await connectToDB();
        // find singular prompt with id params.id
        const existingPrompt = await Prompt.findById(params.id);

        // case where prompt does not exist
        if (!existingPrompt) {
            return new Response("Prompt does not exist!", { status: 404 });
        }

        // update prompt
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();

        // success case
        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error: Failed to update prompt.", { status: 500 });
    }
};

// DELETE
export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();
        // find singular prompt with id params.id and delete
        await Prompt.findByIdAndRemove(params.id);

        // success case
        return new Response("Prompt deleted successfully!", { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error: Failed to delete prompt.", { status: 500 });
    }
};
