"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  title: string;
  path: string;
  icon: React.ReactNode;
}

export default function MenuLink(item: Props) {
  const pathname = usePathname();
  return (
    <Link
      href={item.path}
      className={`flex flex-row items-center justify-start w-full h-12 px-4 w-9/12 mx-4 my-2 rounded-md ${
        pathname === item.path ? "bg-purple-400" : ""
      }`}
    >
      {item.icon}
      &nbsp; &nbsp;
      {item.title}
    </Link>
  );
}
  