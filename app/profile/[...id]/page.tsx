"use client";

import React, { useEffect } from "react";
import MyProfile from "../page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const userPage = ({ params }) => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
  useEffect(() => {
    console.log({ session, params });
    if (status === "authenticated" && session?.user.id == params.id) {
      router.push("/profile");
    }
  }, [status]);
  return <MyProfile />;
};

export default userPage;
