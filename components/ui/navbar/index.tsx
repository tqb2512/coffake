"use client"

import { Navbar, NavbarContent, NavbarItem, Dropdown, DropdownMenu, DropdownItem, DropdownTrigger, Avatar } from "@nextui-org/react"
import Link from "next/link"
import UserProfile from "./userProfile"
import styles from "./navbar.module.css"

export default function NavBar() {
    return (
        <Navbar className="h-16 flex justify-end">
            <NavbarContent className="w-full" justify="end">
                <NavbarItem className="flex items-center">
                    <UserProfile />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}