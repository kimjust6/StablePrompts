"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
    // get session info
    const { data: session } = useSession();

    const [providers, setProviders] = useState(true);
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
        <>
            <nav className="flex-between w-full mb-16 pt-3">
                <Link
                    href="/"
                    className="flex gap-2 flex-center"
                >
                    <Image
                        src="/assets/images/logo.svg"
                        width={45}
                        height={45}
                        alt="logo"
                    ></Image>
                    <p className="logo_text">Stable Prompts</p>
                </Link>

                {/* Desktop Nav */}

                <div className="sm:flex hidden">
                    {session?.user ? (
                        <div className="flex gap-3 md:gap-5">
                            <Link
                                href="/create-prompt"
                                className="black_btn"
                            >
                                Post Prompt
                            </Link>
                            <button
                                type="button"
                                onClick={signOut}
                                className="outline_btn"
                            >
                                Sign Out
                            </button>
                            <Link href="/profile">
                                <Image
                                    src={session?.user.image || "/assets/icons/profile.svg"}
                                    width={45}
                                    height={45}
                                    className="rounded-full"
                                    alt="profile picture"
                                ></Image>
                            </Link>
                        </div>
                    ) : (
                        <>
                            {providers &&
                                Object.values(providers).map((provider) => (
                                    <button
                                        type="button"
                                        key={provider?.name}
                                        onClick={() => {
                                            signIn(provider?.id);
                                        }}
                                        className="black_btn"
                                    >
                                        Sign In
                                    </button>
                                ))}
                        </>
                    )}
                </div>

                {/* Mobile Nav */}
                <div className="sm:hidden flex relative">
                    {session?.user ? (
                        <div className="flex">
                            <Image
                                src={session?.user.image || "/assets/icons/profile.svg"}
                                width={45}
                                height={45}
                                className="rounded-full cursor-pointer"
                                alt="profile picture"
                                onClick={reverseDropDown}
                            ></Image>
                            {isDropDownOpen && (
                                <div className="dropdown">
                                    <Link
                                        href="/profile"
                                        className="dropdown_link"
                                        onClick={reverseDropDown}
                                    >
                                        My Profile
                                    </Link>
                                    <Link
                                        href="/create-prompt"
                                        className="dropdown_link"
                                        onClick={reverseDropDown}
                                    >
                                        Post Prompt
                                    </Link>
                                    <button
                                        type="button"
                                        className="mt-5 w-full black_btn"
                                        onClick={() => {
                                            setIsDropDownOpen(false);
                                            signOut();
                                        }}
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            {providers &&
                                Object.values(providers).map((provider) => (
                                    <button
                                        type="button"
                                        key={provider?.name}
                                        onClick={() => {
                                            signIn(provider?.id);
                                        }}
                                        className="black_btn"
                                    >
                                        Sign In
                                    </button>
                                ))}
                        </>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Nav;
