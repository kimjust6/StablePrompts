import mongoose from "mongoose";

// variable to check db connection
let isDBConnected = false;

export const connectionToDB = async () => {
    mongoose.set("strictQuery", true);

    if (isDBConnected) {
        console.log("MongoDB is already connected.");
    } else {
        console.log("Connecting to MongoDB.");
        // connect to mongodb
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                dbName: "stable_prompt",
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        } catch (error) {
            console.log(error);
        }
    }
};
