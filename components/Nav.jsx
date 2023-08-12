"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";

const Nav = () => {
    // get session info
    const { data: session, status } = useSession();
    const router = useRouter();
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
            <nav className="flex-between w-full mb-16 pt-3" >
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


                {/* Mobile Nav */}
                <div className="flex relative ">
                    {status !== "loading" && session?.user ? (
                        <div className="flex gap-6">
                            <div className=" hidden sm:flex gap-6">
                                <Link
                                    href="/create-prompt"
                                    className="black_btn"
                                >
                                    Post Prompt
                                </Link>
                                <Link
                                    href="/profile"
                                    className="outline_btn"
                                >
                                    My Profile
                                </Link>
                            </div>
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
                                        className="dropdown_link w-full outline_btn"
                                        onClick={reverseDropDown}
                                    >
                                        My Profile
                                    </Link>
                                    <Link
                                        href="/create-prompt"
                                        className="dropdown_link mt-1 w-full outline_btn"
                                        onClick={reverseDropDown}
                                    >
                                        Post Prompt
                                    </Link>
                                    <button
                                        type="button"
                                        className="mt-1 w-full black_btn"
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
                                        className="black_btn gap-2"
                                    >
                                        <Image
                                            src="/assets/icons/google.svg"
                                            alt="googleLogo"
                                            height={20}
                                            width={20}
                                        ></Image>
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
