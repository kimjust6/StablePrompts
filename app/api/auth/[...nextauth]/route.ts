import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import User from "@/models/user";
import { connectToDB } from "@/utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();

      return session;
    },

    async signIn(userInfo: any) {
      try {
        await connectToDB();

        // if user exists
        const doesUserExist = await User.findOne({
          email: userInfo.profile.email,
        });

        // if user does not exist, create it
        if (!doesUserExist) {
          await User.create({
            email: userInfo.profile.email,
            fName: userInfo.profile.given_name,
            lName: userInfo.profile.family_name,
            image: userInfo.profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
