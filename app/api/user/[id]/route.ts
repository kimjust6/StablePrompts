import User from "@/models/user";
import { connectToDB } from "@/utils/database";

// pass in url params as well
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const myUser = await User.findOne({ _id: params.id });
    return new Response(JSON.stringify(myUser), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error: Failed to retrieve user.", { status: 500 });
  }
};
