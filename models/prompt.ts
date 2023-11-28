import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  prompt: {
    type: String,
    required: [true, "A prompt is required."],
  },
  tag: {
    type: String,
  },
});

// use the Prompt model, || or else create it using PromptSchema
const Prompt = models.prompt || model("prompt", PromptSchema);
export default Prompt;
