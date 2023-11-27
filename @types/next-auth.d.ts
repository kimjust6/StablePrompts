import { DefaultSession } from "next-auth";
// user object in next auth session
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
    } & DefaultSession["user"];
  }
}
