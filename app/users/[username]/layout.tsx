import SideBar from "@/components/ui/sidebar";
import NavBar from "@/components/ui/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-light-background">
            {children}
        </div>
    )
}