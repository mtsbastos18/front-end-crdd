import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { AuthGuard } from "@/components/AuthGuard";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 ml-64">
                <Header />
                <main className="p-6 mt-16">
                    {children}
                </main>
            </div>
        </div>
    )
}