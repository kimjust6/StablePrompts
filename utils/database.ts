import mongoose from "mongoose";

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  // check if mongodb url is set
  if (!process.env.MONGODB_URI) {
    return new Error("MongoDB URI is not set.");
  }

  if (mongoose.connections[0].readyState) {
    console.log("MongoDB is already connected.");
  } else {
    // connect to mongodb
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "stable_prompt2",
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      });

      console.log("Established connection to MongoDB");
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};
