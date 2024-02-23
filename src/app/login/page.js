"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post("/api/users/login", user);
            router.push("/");
            router.refresh();
        } catch (error) {
            console.log(`Login failed ${error}`);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="relative max-w-[400px] min-h-[85vh] p-3 flex flex-col items-center justify-center mx-auto">
            <form
                onSubmit={handleLogin}
                className="w-full border-2 border-black p-10 rounded-2xl space-y-6"
            >
                <h1 className="text-3xl text-center font-semibold">
                    {loading ? "Login..." : "Login"}
                </h1>
                <div>
                    <Label htmlFor="email">Email :</Label>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        id="email"
                        value={user.email}
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="password">Password :</Label>
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        id="password"
                        value={user.password}
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
                        required
                    />
                </div>
                <Button type="submit" disabled={loading ? true : false}>
                    Login
                </Button>
                <div className="text-[0.9rem] text-center font-medium mt-6 mb-[10px]">
                    <p>
                        Dont have an account?{" "}
                        <Link
                            className="font-semibold hover:underline"
                            href="/signup"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
