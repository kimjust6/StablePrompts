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
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChevronDown, Home, LogOut, Plus, User2 } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./themeToggle";

const NavOptions = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  const signInButton = () => {
    return (
      // <Link href="/auth/login">
      <Button
        variant="outline"
        onClick={() => {
          signIn("google");
        }}>
        <Image
          src="/assets/icons/google.svg"
          alt="googleLogo"
          height={20}
          width={20}></Image>
        {/* <LogIn strokeWidth={1.5} className="h-5 w-5 -ml-1" /> */}
        <span className="mx-2">Sign In</span>
      </Button>
      // </Link>
    );
  };

  const dropdownMenu = () => {
    if (!session?.user) {
      return null;
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {!session.user.image ? (
              <User2 strokeWidth={1.5} className="h-5 w-5 -ml-1" />
            ) : (
              <Image
                src={session.user.image}
                alt="Profile Picture"
                width={24}
                height={24}
                priority={true}
                className="rounded-full -ml-1"
              />
            )}
            <span className="mx-2">{session.user.name}</span>
            <ChevronDown strokeWidth={1.5} className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52 mr-4">
          <DropdownMenuLabel>Manage Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                router.push("/home");
              }}>
              <Home strokeWidth={1.5} className="h-4 w-4" />
              <span className="mx-3">Home</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                router.push("/profile");
              }}>
              <User2 strokeWidth={1.5} className="h-4 w-4" />
              <span className="mx-3">Profile</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                router.push("/create-prompt");
              }}>
              <Plus strokeWidth={1.5} className="h-4 w-4" />
              <span className="mx-3">New Prompt</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => signOut()}
            className="cursor-pointer">
            <LogOut strokeWidth={1.5} className="h-4 w-4" />
            <span className="mx-3">Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div className="flex items-center gap-2">
      {/* <SearchBar /> */}
      <TooltipProvider>
        <ThemeToggle />
      </TooltipProvider>
      {session?.user ? dropdownMenu() : signInButton()}
    </div>
  );
};

export default NavOptions;