"use client";

import { SessionProvider } from "next-auth/react";

interface providerProps {
  children: any;
  session?: any;
}

const Provider = ({ children, session }: providerProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
