"use client";

import { Button } from "@/components/ui/button";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Nav = () => {
  // get session info
  const { data: session, status } = useSession();
  const router = useRouter();
  const [providers, setProviders] = useState<any>(true);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const reverseDropDown = () => {
    setIsDropDownOpen((prevState) => !prevState);
  };

  // runs once on load
  useEffect(() => {
    const initializeProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    initializeProviders();
  }, []);

  return (
    <div className="w-full flex flex-row justify-between ">
      <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 items-center justify-center">
          <Image
            src="/assets/images/logo.svg"
            width={45}
            height={45}
            alt="logo"></Image>
          <p className="logo_text">Stable Prompts</p>
        </Link>
        {/* Mobile Nav */}
        <div className="flex relative ">
          {status !== "loading" && session?.user ? (
            <div className="flex gap-6">
              <div className=" hidden sm:flex gap-6">
                <Button
                  variant="default"
                  onClick={() => {
                    router.push("/create-prompt");
                  }}>
                  Post Prompt
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    router.push("/profile");
                  }}>
                  My Profile
                </Button>
              </div>
              <Image
                src={session?.user.image || "/assets/icons/profile.svg"}
                width={45}
                height={45}
                className="rounded-full cursor-pointer"
                alt="profile picture"
                onClick={reverseDropDown}></Image>
              {isDropDownOpen && (
                <div className="dropdown ">
                  <Button
                    className="dropdown_link w-full outline_btn"
                    onClick={() => {
                      router.push("/profile");
                      reverseDropDown();
                    }}>
                    My Profile
                  </Button>
                  <Button
                    className="dropdown_link mt-1 w-full outline_btn"
                    onClick={() => {
                      router.push("/create-prompt");
                      reverseDropDown();
                    }}>
                    Post Prompt
                  </Button>
                  <Button
                    type="button"
                    variant="default"
                    className="mt-1 "
                    onClick={() => {
                      setIsDropDownOpen(false);
                      signOut();
                    }}>
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider: any) => (
                  <Button
                    type="button"
                    key={provider?.name}
                    onClick={() => {
                      signIn(provider?.id);
                    }}
                    className="black_btn gap-2">
                    <Image
                      src="/assets/icons/google.svg"
                      alt="googleLogo"
                      height={20}
                      width={20}></Image>
                    Sign In
                  </Button>
                ))}
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Nav;
