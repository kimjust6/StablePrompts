"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const Root = () => {
    const { push } = useRouter();

    useEffect(() => {
        push("/home");
    }, []);
    return <></>;
};

export default Root;