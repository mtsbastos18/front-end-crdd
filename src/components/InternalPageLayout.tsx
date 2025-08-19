'use client';

import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";


export default function InternalPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <div
                className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-16"
                    }`}
            >
                <Header isSidebarOpen={isSidebarOpen} />
                <main className="p-6 mt-16">{children}</main>
            </div>
        </div>
    );
}