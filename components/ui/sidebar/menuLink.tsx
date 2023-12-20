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
      className={`text-white flex flex-row items-center justify-start px-4 h-12 w-10/12 mx-4 my-2 rounded-md ${
        pathname.startsWith(item.path) ? "bg-purple-400" : ""
      }`}
    >
      {item.icon}
      &nbsp; &nbsp;
      <h1 className="max-md:hidden">{item.title}</h1>
    </Link>
  );
}
