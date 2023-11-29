"use client";

import Image from "next/image";
import Link from "next/link";
import NavOptions from "./NavOptions";
import { usePathname } from "next/navigation";

const Nav = () => {
  const path = usePathname();

  return path == "/home" ? (
    ""
  ) : (
    <section className="w-full flex flex-row justify-between  items-center py-2">
      <nav className="flex-between w-full ">
        <Link
          href="/homepage"
          className="flex gap-2 items-center justify-center">
          <Image
            src="/assets/images/logo.svg"
            width={45}
            height={45}
            alt="logo"
          />
          <p className="logo_text">Stable Prompts</p>
        </Link>
        <NavOptions />
      </nav>
    </section>
  );
};
export default Nav;
