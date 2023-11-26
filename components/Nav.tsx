"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  CreditCard,
  LogOut,
  Settings,
  UserRound,
} from "lucide-react";
import { getProviders, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavOptions from "./NavOptions";
import Link from "next/link";
import { ThemeToggle } from "./themeToggle";

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

    console.log({ session });
    initializeProviders();
  }, [status]);

  return (
    <section className="w-full flex flex-row justify-between ">
      <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 items-center justify-center">
          <Image
            src="/assets/images/logo.svg"
            width={45}
            height={45}
            alt="logo"></Image>
          <p className="logo_text">Stable Prompts</p>
        </Link>
        <NavOptions />
      </nav>
    </section>
  );
};

export default Nav;
