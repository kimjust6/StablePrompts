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
    <section className="flex w-full flex-row items-center justify-between py-2">
      <nav className="flex-between w-full">
        <Link
          href="/homepage"
          className="flex items-center justify-center gap-2">
          <Image
            src="/assets/images/logo.svg"
            width={45}
            height={45}
            priority
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
