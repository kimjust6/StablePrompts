"use server";

import { PATCH } from "@/app/api/prompt/[id]/route";
import StableAPI from "@/models/stableAPI";
import { connectToDB } from "./database";
import Prompt from "@/models/prompt";
import User from "@/models/user";
import { convertUrl } from "./helperFunctions";

// set the stable diffusions api url
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

// get the stable diffusions api url
export async function getStableDiffusionAPIMongoDB() {
  try {
    await connectToDB();
    const response = await StableAPI.findOne({});
    return JSON.stringify(response);
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "Error: Failed to update url." });
  }
}

// get all prompts
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

// get prompts by creator id
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

export async function generateImage(prompt: string, postId: string = null) {
  try {
    // data for the image generation api call
    const data = {
      prompt: prompt,
      negative_prompt: "",
      style_selections: ["Fooocus V2", "Fooocus Enhance", "Fooocus Sharp"],
      performance_selection: "Extreme Speed",
      aspect_ratios_selection: "1152×896",
      image_number: 1,
      image_seed: -1,
      sharpness: 2,
      guidance_scale: 4,
      base_model_name: "juggernautXL_version6Rundiffusion.safetensors",
      refiner_model_name: "None",
      refiner_switch: 0.5,
      loras: [
        {
          model_name: "sd_xl_offset_example-lora_1.0.safetensors",
          weight: 0.1,
        },
      ],
      advanced_params: {
        disable_preview: false,
        adm_scaler_positive: 1.5,
        adm_scaler_negative: 0.8,
        adm_scaler_end: 0.3,
        refiner_swap_method: "joint",
        adaptive_cfg: 7,
        sampler_name: "dpmpp_2m_sde_gpu",
        scheduler_name: "karras",
        overwrite_step: -1,
        overwrite_switch: -1,
        overwrite_width: -1,
        overwrite_height: -1,
        overwrite_vary_strength: -1,
        overwrite_upscale_strength: -1,
        mixing_image_prompt_and_vary_upscale: false,
        mixing_image_prompt_and_inpaint: false,
        debugging_cn_preprocessor: false,
        skipping_cn_preprocessor: false,
        controlnet_softness: 0.25,
        canny_low_threshold: 64,
        canny_high_threshold: 128,
        freeu_enabled: false,
        freeu_b1: 1.01,
        freeu_b2: 1.02,
        freeu_s1: 0.99,
        freeu_s2: 0.95,
        debugging_inpaint_preprocessor: false,
        inpaint_disable_initial_latent: false,
        inpaint_engine: "v1",
        inpaint_strength: 1,
        inpaint_respective_field: 1,
      },
      require_base64: false,
      async_process: false,
    };

    await connectToDB();
    // get url for stable diffusions api
    const base_url = await StableAPI.findOne({});

    // make the stable diffusion api call
    // webui call
    // const response = await fetch(`${base_url.url}/sdapi/v1/txt2img`, {
    //
    const response = await fetch(
      `${base_url.url}/v1/generation/text-to-image`,
      {
        cache: "no-store",
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: new Headers({ "content-type": "application/json" }),
        mode: "no-cors",
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      }
    );
    const image = await response.json(); // parses JSON response into native JavaScript objects

    // const image = [
    //   {
    //     url: "http://127.0.0.1:8888/files/2023-12-01/665f61f3-714f-4a18-858a-1e204d57d7ed.png",
    //     seed: "350553767766078675",
    //     finish_reason: "SUCCESS",
    //   },
    // ];
    const returnUrl = convertUrl(image[0].url, base_url.url);

    // TODO upload image to edgestore

    // save result to mongodb
    const newPrompt = await updatePrompt(
      { prompt: null, tag: null, imageUrl: returnUrl },
      postId
    );
    // console.log({ newPrompt });
    return returnUrl;
  } catch (error) {
    // console.log(error);
    return JSON.stringify({ error: "User does not exist." });
  }
}

interface PromptData {
  prompt: string;
  tag: string;
  imageUrl: string;
}

export async function updatePrompt(prompt: PromptData, id: string) {
  try {
    await connectToDB();
    // find singular prompt with id params.id
    const existingPrompt = await Prompt.findById(id);

    // case where prompt does not exist
    if (!existingPrompt) {
      return JSON.stringify({ error: "Prompt does not exist." });
    }
    // update prompt
    prompt?.prompt ? (existingPrompt.prompt = prompt.prompt) : "";
    prompt?.tag ? (existingPrompt.tag = prompt.tag) : "";
    prompt?.imageUrl ? (existingPrompt.imageUrl = prompt.imageUrl) : "";
    // console.log({ existingPrompt });
    await existingPrompt.save();
    // success case
    return JSON.stringify(existingPrompt);
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "Failed to update Prompt." });
  }
}
