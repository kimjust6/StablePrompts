import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

// route that adds data to mongodb
export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    // create new prompt object
    const newPrompt = new Prompt({
      creator: userId,
      prompt: prompt,
      tag: tag,
      imageUrl: "",
    });
    // save the prompt to db
    await newPrompt.save();

    // return the result with success status code
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Error: Failed to create prompt.", { status: 500 });
  }
};
