import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
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
const Prompt = models.Prompt || model("Prompt", PromptSchema);
export default Prompt;