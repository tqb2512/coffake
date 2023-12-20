import SideBar from "@/components/ui/sidebar";
import NavBar from "@/components/ui/navbar";

export default function Layout({ children }: { children: React.ReactNode }){
    return (
        <div className="flex flex-row">
            <div className="z-50 w-64 max-md:w-fit h-screen">
                <SideBar />l
            </div>
            <div className="-ms-8 max-md:ms-0 flex flex-col w-full h-screen">
                <NavBar />
                {children}
            </div>
        </div>
    )
}