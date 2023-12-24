import SideBar from "@/components/ui/sidebar";
import NavBar from "@/components/ui/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row">
            <div className="z-50 w-64 h-screen">
                <SideBar />
            </div>
            <div className="-ms-8 w-full flex flex-col ">
                <NavBar />
                {children}
            </div>
        </div>
    )
}