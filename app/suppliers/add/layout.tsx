import SideBar from "@/components/ui/sidebar";
import NavBar from "@/components/ui/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row">
            <div className="flex flex-col w-full h-screen">
                {children}
            </div>
        </div>
    )
}