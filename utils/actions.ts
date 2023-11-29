"use server";

import StableAPI from "@/models/stableAPI";
import { connectToDB } from "./database";
import Prompt from "@/models/prompt";
import User from "@/models/user";

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
    return JSON.stringify({ error: "Error: Failed to update url." });
  }
}
export async function getStableDiffusionAPIMongoDB(url: string) {
  try {
    await connectToDB();
    const response = await StableAPI.findOne({});
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "Error: Failed to update url." });
  }
}

export async function getAllPrompts() {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");

    return JSON.stringify(prompts);
  } catch (error) {
    console.log(error);
    JSON.stringify({ error: "Could not get all Prompts." });
  }
}

export async function getPromptByCreatorId(id: string) {
  try {
    await connectToDB();
    // find singular prompt with id params.id
    const prompt = await Prompt.find({ creator: id }).populate("creator");

    // case where prompt does not exist
    if (!prompt) {
      return JSON.stringify({ error: "Prompt does not exist." });
    }

    // success case
    return JSON.stringify(prompt);
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "User has no Prompts." });
  }
}
export async function getUserById(id: string) {
  try {
    await connectToDB();
    // find singular prompt with id params.id
    const UseInfo = await User.find({ id: id });

    // case where prompt does not exist
    if (!UseInfo) {
      return JSON.stringify({ error: "Prompt does not exist." });
    }

    // success case
    return JSON.stringify(UseInfo);
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "User does not exist." });
  }
}
