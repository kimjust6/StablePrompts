import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "That email is already in use."],
        required: [true, "An email address is required."],
    },
    username: {
        type: String,
        unique: [true, "That username is already in use."],
        required: [true, "A username is required."],
        match: [
            /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
            "Username invalid, it must contain 8-20 alphanumeric characters.",
        ],

        // ^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$
        //  └─────┬────┘└───┬──┘└─────┬─────┘└─────┬─────┘ └───┬───┘
        //        │         │         │            │           no _ or . at the end
        //        │         │         │            │
        //        │         │         │            allowed characters
        //        │         │         │
        //        │         │         no __ or _. or ._ or .. inside
        //        │         │
        //        │         no _ or . at the beginning
        //        │
        //        username is 8-20 characters long
    },
    image: {
        type: String,
    },
});

// check if models.User exists, || if not create model User with UserSchema
const User = models.User || model("User", UserSchema);
export default User;
