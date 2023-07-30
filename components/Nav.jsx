"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
    const isLoggedIn = true;
    const [providers, setProviders] = useState(null);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    // runs once on load
    useEffect(() => {
        const setProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        };

        setProviders();
    }, []);

    return (
        <>
            <nav className="flex-between w-full mb-16 pt-3">
                <Link
                    href="/"
                    className="flex gap-2 flex-center"
                >
                    <Image
                        src="/assets/images/logo1.png"
                        width={45}
                        height={45}
                        alt="logo"
                    ></Image>
                    <p className="logo_text">Stable Prompts</p>
                </Link>

                {/* Mobile Nav */}

                <div className="sm:flex hidden">
                    {isLoggedIn ? (
                        <div className="flex gap-3 md:gap-5">
                            <Link
                                href="/create-prompt"
                                className="black_btn"
                            >
                                Create Prompt
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
                                    src="/assets/images/profile.svg"
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
                                Object.values(provides).map((provider) => {
                                    <button
                                        type="button"
                                        key={provider.name}
                                        onClick={() => {
                                            signIn(provider.id);
                                        }}
                                        className="black_btn"
                                    >
                                        Sign In
                                    </button>;
                                })}
                        </>
                    )}
                </div>

                {/* Desktop Nav */}
                <div className="sm:hidden flex relative">
                    {isLoggedIn ? (
                        <div className="flex">
                            <Image
                                src="/assets/images/logo1.png"
                                width={45}
                                height={45}
                                className="rounded-full"
                                alt="profile picture"
                                onClick={() => {
                                    setIsDropDownOpen((prevState) => !prevState);
                                }}
                            ></Image>
                            {isDropDownOpen && (
                                <div className="dropdown">
                                    <Link
                                        href="/profile"
                                        className="dropdown_link"
                                    >
                                        My Profile
                                    </Link>
                                    <Link
                                        href="/create-prompt"
                                        className="dropdown_link"
                                    >
                                        Create Prompt
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
                                Object.values(provides).map((provider) => {
                                    <button
                                        type="button"
                                        key={provider.name}
                                        onClick={() => {
                                            signIn(provider.id);
                                        }}
                                        className="black_btn"
                                    >
                                        Sign In
                                    </button>;
                                })}
                        </>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Nav;
