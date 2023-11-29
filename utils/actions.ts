"use server";

import StableAPI from "@/models/stableAPI";
import { connectToDB } from "./database";
import Prompt from "@/models/prompt";

export async function setStableDiffusionAPIMongoDB(url: string) {
  try {
    await connectToDB();
    const response = await StableAPI.find({});
    if (response.length == 1) {
      const existingStableAPI = await StableAPI.findById(response[0]._id);
      existingStableAPI.url = url;
      await existingStableAPI.save();
    } else {
      if (response.length > 1) {
        await StableAPI.deleteMany({});
      }
      const newStableAPI = new StableAPI({
        url: url,
      });
      newStableAPI.save();
    }
  } catch (error) {
    console.log(error);
    return new Response("Error: Failed to update url.", { status: 500 });
  }
}
export async function getStableDiffusionAPIMongoDB(url: string) {
  try {
    await connectToDB();
    const response = await StableAPI.findOne({});
  } catch (error) {
    console.log(error);
    return new Response("Error: Failed to update url.", { status: 500 });
  }
}

export async function getAllPrompts() {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error: Failed to retrieve prompts.", { status: 500 });
  }
}

export async function getPromptByCreatorId(id: string) {
  try {
    await connectToDB();
    // find singular prompt with id params.id
    const prompt = await Prompt.findById(id);

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
}
