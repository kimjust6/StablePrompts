"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const Root = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/homepage");
  }, []);
  return <></>;
};

export default Root;
