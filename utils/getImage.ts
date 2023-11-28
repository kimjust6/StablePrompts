"use server";

const STABLE_BASE_URL = "http://192.168.2.237/7860";
export const getStableDiffusionImage = async (
  prompt: string,
  negativePrompt: string = ""
) => {
  console.log(`${STABLE_BASE_URL}/sdapi/v1/txt2img`);
  const result = await fetch(`${STABLE_BASE_URL}/sdapi/v1/txt2img`, {
    method: "Post",
    body: JSON.stringify({
      prompt: prompt,
      negativePrompt: negativePrompt,
      steps: 5,
      height: 512,
      width: 512,
    }),
  });

  console.log({ result });
  return result;
};
