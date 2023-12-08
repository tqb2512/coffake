"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface Props {
    title: string;
    path: string;
    icon: React.ReactNode;
}

export default function MenuLink(item: Props) {
    const pathname = usePathname()
    return (
        <Link href={item.path} className={`flex flex-row items-center justify-start w-full h-12 px-4 rounded-md ${pathname === item.path ? "bg-gray-200" : ""}`}>
            {item.icon}
            {item.title}
        </Link>
    )
}