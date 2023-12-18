import SideBar from "@/components/ui/sidebar";
import NavBar from "@/components/ui/navbar";
import { AppProviders } from "@/app/providers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}
