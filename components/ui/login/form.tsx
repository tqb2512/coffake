'use client'

import { signIn } from "next-auth/react";
import { FormEvent, use, useState } from "react"
import { useRouter } from "next/navigation";


export default function LoginForm() {

    const [error, setError] = useState(false);
    const userRouter = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const response = await signIn("credentials", {
            username: data.get("username") as string,
            password: data.get("password") as string,
            redirect: false,
        });

        if (response?.error) {
            setError(true);
        } else {
            userRouter.push("/dashboard");
        }
    };
    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full max-w-md mt-4">
            <div className="flex flex-col w-full">
                <label htmlFor="username" className="text-sm font-semibold text-gray-600">Username</label>
                <input type="text" name="username" id="username" className="px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
            </div>
            <div className="flex flex-col w-full mt-4">
                <label htmlFor="password" className="text-sm font-semibold text-gray-600">Password</label>
                <input type="password" name="password" id="password" className="px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
            </div>
            <button type="submit" className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Sign in</button>
            {error && <p className="mt-4 text-sm text-red-600">Invalid username or password</p>}
        </form>
    )
}