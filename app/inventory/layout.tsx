import SideBar from "@/components/ui/sidebar";
import NavBar from "@/components/ui/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row">
            <div className="w-64 z-50 max-md:w-fit h-screen">
                <SideBar />
            </div>
            <div className="-ms-8 flex flex-col w-full h-screen">
                <NavBar />
                {children}
            </div>
        </div>
    )
}