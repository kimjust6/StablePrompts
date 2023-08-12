import mongoose from "mongoose";

// variable to check db connection
let isDBConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if (isDBConnected) {
        console.log("MongoDB is already connected.");
    } else {
        // connect to mongodb
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                dbName: "stable_prompt",
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });


            isDBConnected = true;
            console.log("Established connection to MongoDB");
        } catch (error) {
            console.log(error);
        }
    }
};
