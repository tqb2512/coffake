import SideBar from "@/components/ui/sidebar";
import NavBar from "@/components/ui/navbar";
import { AppProviders } from "../providers";

export default function Layout({ children }: { children: React.ReactNode }){
    return (

            <div className="flex">
                <div className="w-64 h-screen">
                    <SideBar />
                </div>
                <div className="-ms-8 w-full flex flex-col h-screen">
                    <NavBar />
                    {children}
                </div>
            </div>

    )
}