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
      try {
        const sessionUser = await User.findOne({
          email: session.user.email,
        });

        session.user.id = sessionUser._id.toString();

        return session;
      } catch (error) {
        console.log(error);
        return session;
      }
    },

    async signIn({ profile }: any) {
      try {
        await connectToDB();

        // if user exists
        const doesUserExist = await User.findOne({ email: profile.email });

        // if user does not exist, create it
        if (!doesUserExist) {
          await User.create({
            email: profile.email,
            fName: profile.given_name,
            lName: profile.family_name,
            image: profile.picture,
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

// import NextAuth from "next-auth/next";
// import GoogleProvider from "next-auth/providers/google";

// import User from "@/models/user";
// import { connectToDB } from "@/utils/database";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   jwt: {
//     // The maximum age of the NextAuth.js issued JWT in seconds.
//     // Defaults to `session.maxAge`.
//     maxAge: 60 * 60 * 24 * 30,
//   },
//   // secret for jwt
//   secret: process.env.NEXTAUTH_SECRET as string,

//   callbacks: {
//     async session({ session }) {
//       try {
//         const sessionUser = await User.findOne({
//           email: session.user.email,
//         } as any);

//         session.user.id = sessionUser._id.toString();
//         return session;
//       } catch (error) {
//         console.log(error);
//       }
//       return session;
//     },

//     async signIn(userInfo: any) {
//       try {
//         await connectToDB();

//         // if user exists
//         const doesUserExist = await User.findOne({
//           email: userInfo.profile.email,
//         });

//         // if user does not exist, create it
//         if (!doesUserExist) {
//           await User.create({
//             email: userInfo?.profile?.email,
//             fName: userInfo?.profile?.given_name,
//             lName: userInfo?.profile?.family_name,
//             image: userInfo?.profile?.picture,
//           });
//         }
//         return true;
//       } catch (error) {
//         console.log(error);
//         return false;
//       }
//     },
//   },
// });

// export { handler as GET, handler as POST };
