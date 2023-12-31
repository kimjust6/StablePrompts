import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "user2",
  },
  prompt: {
    type: String,
    required: [true, "A prompt is required."],
  },
  tag: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
});

// use the Prompt model, || or else create it using PromptSchema
const Prompt = models.prompt2 || model("prompt2", PromptSchema);
export default Prompt;
