"use client"

import { Navbar, NavbarContent, NavbarItem, Dropdown, DropdownMenu, DropdownItem, DropdownTrigger, Avatar } from "@nextui-org/react"
import Link from "next/link"
import UserProfile from "./userProfile"
import styles from "./navbar.module.css"

export default function NavBar() {
    return (
        <Navbar className="h-16">
            <NavbarContent className="w-36"justify="start">
                <NavbarItem>
                </NavbarItem>
            </NavbarContent>
            
            <NavbarContent className="w-36" justify="end">
                <NavbarItem>
                   <UserProfile />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}