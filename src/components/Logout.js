"use client";

import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";

const Logout = ({ cookie }) => {
    const router = useRouter();

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            router.push("/login");
            router.refresh();
        } catch (error) {
            console.error(error.message);
        }
    };
    return (
        <>
            {cookie ? (
                <Button onClick={logout}>Logout</Button>
            ) : (
                <Button>
                    <Link href="/login">Login</Link>
                </Button>
            )}
        </>
    );
};

export default Logout;
