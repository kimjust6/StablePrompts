"use server";

import StableAPI from "@/models/stableAPI";
import { connectToDB } from "./database";
import Prompt from "@/models/prompt";
import User from "@/models/user";

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

export async function generateImage(prompt: string) {
  try {
    // body for the stable diffusions api call
    const data = {
      prompt: prompt,
      negative_prompt: "",
      styles: ["string"],
      seed: -1,
      subseed: -1,
      subseed_strength: 0,
      seed_resize_from_h: -1,
      seed_resize_from_w: -1,
      sampler_name: "Euler a",
      batch_size: 1,
      n_iter: 1,
      steps: 25,
      cfg_scale: 7,
      width: 512,
      height: 512,
      restore_faces: true,
      tiling: true,
      do_not_save_samples: false,
      do_not_save_grid: false,
      eta: 0,
      denoising_strength: 0,
      s_min_uncond: 0,
      s_churn: 0,
      s_tmax: 0,
      s_tmin: 0,
      s_noise: 0,
      override_settings: {},
      override_settings_restore_afterwards: true,

      refiner_switch_at: 0,
      disable_extra_networks: false,
      comments: {},
      enable_hr: false,
      firstphase_width: 0,
      firstphase_height: 0,
      hr_scale: 2,
      hr_second_pass_steps: 0,
      hr_resize_x: 0,
      hr_resize_y: 0,
      hr_prompt: "",
      hr_negative_prompt: "",
      sampler_index: "Euler",
      script_name: "",
      script_args: [],
      send_images: true,
      save_images: false,
      alwayson_scripts: {},
    };

    await connectToDB();
    // get url for stable diffusions api
    const base_url = await StableAPI.findOne({});

    // make the stable dffusion api call
    const response = await fetch(`${base_url.url}/sdapi/v1/txt2img`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: new Headers({ "content-type": "application/json" }),
      mode: "no-cors",
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const image = await response.json(); // parses JSON response into native JavaScript objects
    return image.images[0];
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "User does not exist." });
  }
}