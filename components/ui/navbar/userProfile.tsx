'use client'

import { useSession } from "next-auth/react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Navbar, User } from "@nextui-org/react"
import styles from "./userProfile.module.css"
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserProfile() {
    const router = useRouter();
    const { data: session, status } = useSession()
    if (status === "loading") return <p>Loading...</p>;
    if (status === "unauthenticated") {
        router.push("/login")
    }
    return (
        <div className="flex items-center gap-4">
            <Dropdown>
                <DropdownTrigger>
                    <Image src={"https://avatars.githubusercontent.com/u/111489675?v=4"} alt="Profile Picture" width={36} height={32}
                        className="rounded-full border border-spacing-3 border-black" />
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownItem href={`/profile/${session?.user?.name}`}>
                        Profile
                    </DropdownItem>
                    <DropdownItem href="/api/auth/signout" onClick={() => signOut()}>
                        Sign out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <div className="flex flex-col ml-2">
                <span className="text-sm font-semibold">{session?.user?.name ?? "User Name"}</span>
                <span className="text-xs text-gray-500">{session?.user?.position ?? "User Position"}</span>
            </div>
        </div>
    )
}