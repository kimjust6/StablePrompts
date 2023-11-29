import { Schema, model, models } from "mongoose";

const StableApiSchema = new Schema({
  url: {
    type: String,
    required: [true, "A url is required."],
  },
});

// use the StableAPI model, || or else create it using StableApiSchema
const StableAPI = models.stableapi || model("stableapi", StableApiSchema);
export default StableAPI;
