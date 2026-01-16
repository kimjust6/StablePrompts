"use server";

import Prompt from "@/models/prompt";
import User from "@/models/user";
import { GoogleGenAI } from "@google/genai";
import { geminiFlashImage } from "./constants";
import { connectToDB } from "./database";
import { PromptData } from "./Interfaces";

async function generateGeminiImage(userPrompt: string) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return null;
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: geminiFlashImage,
      contents: userPrompt,
    });

    let image = "";
    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          image += part.inlineData.data;
        }
      }
    }

    if (image) {
      return image;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export async function generateGeminiImageAndSaveToDb(
  userPrompt: string,
  postId: string | null = null
) {
  try {
    const image = await generateGeminiImage(userPrompt);

    if (!image) {
      return null;
    }

    if (postId) {
      await updatePrompt({ prompt: null, tag: null, imageUrl: image } as PromptData, postId);
    }

    return image;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
}

// get all prompts
export async function getAllPrompts(): Promise<string> {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator").select("-imageUrl");

    return JSON.stringify(prompts);
  } catch (error) {
    return JSON.stringify({ error: "Could not get all Prompts." });
  }
}

// get prompts by creator id
export async function getPromptByCreatorId(id: string): Promise<string> {
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
    return JSON.stringify({ error: "User has no Prompts." });
  }
}

export async function getUserById(id: string): Promise<string> {
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
    return JSON.stringify({ error: "User does not exist." });
  }
}

export async function updatePrompt(prompt: PromptData, id: string): Promise<string> {
  try {
    await connectToDB();
    // find singular prompt with id params.id
    const existingPrompt = await Prompt.findById(id);

    if (!existingPrompt) {
      return JSON.stringify({ error: "Prompt does not exist." });
    }

    // update prompt
    prompt?.prompt && (existingPrompt.prompt = prompt.prompt);
    prompt?.tag && (existingPrompt.tag = prompt.tag);
    prompt?.imageUrl && (existingPrompt.imageUrl = prompt.imageUrl);

    await existingPrompt.save();
    // success case
    return JSON.stringify(existingPrompt);
  } catch (error) {
    return JSON.stringify({ error: "Failed to update Prompt." });
  }
}

export async function getPromptImage(id: string): Promise<string | null> {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(id).select("imageUrl");
    return prompt?.imageUrl;
  } catch (error) {
    return null;
  }
}
