import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "That email is already in use."],
    required: [true, "An email address is required."],
  },
  fName: {
    type: String,
    required: [true, "A first name is required."],
  },
  lName: {
    type: String,
    required: [true, "A last name is required."],
  },
  image: {
    type: String,
  },
});

// check if models.User exists, || if not create model User with UserSchema
const User = models.user2 || model("user2", UserSchema);
export default User;
