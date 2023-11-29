import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const GET = async (req) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({
      creator: "6566b3b71e31bca5c7db4d28",
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error: Failed to retrieve prompts.", { status: 500 });
  }
};
