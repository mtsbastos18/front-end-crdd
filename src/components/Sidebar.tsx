'use client'
import Link from "next/link";
import { HomeIcon, UsersIcon } from "@heroicons/react/24/outline";

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
    const handleToggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div
            className={`fixed inset-y-0 left-0 bg-white shadow-lg p-4 transition-all duration-300 ${isOpen ? "w-64" : "w-16"
                }`}
        >
            <div className="flex items-center space-x-2 mb-8 p-2">
                <div className="w-8 h-8 bg-primary-500 rounded"></div>
                <span className={`font-bold text-xl ${isOpen ? "block" : "hidden"}`}>
                    CRDD
                </span>
                <button onClick={handleToggleSidebar} className="ml-auto">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            <nav>
                <ul className="space-y-2">
                    <li>
                        <Link
                            href="/dashboard"
                            className={`flex items-center space-x-2 p-2 rounded hover:bg-primary-50 text-primary-600 ${isOpen ? "w-full" : "w-16"
                                }`}
                        >
                            <HomeIcon className="w-5 h-5" />
                            <span className={`${isOpen ? "block" : "hidden"}`}>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dispatchers"
                            className={`flex items-center space-x-2 p-2 rounded hover:bg-primary-50 text-gray-600 hover:text-primary-600 ${isOpen ? "w-full" : "w-16"
                                }`}
                        >
                            <UsersIcon className="w-5 h-5" />
                            <span className={`${isOpen ? "block" : "hidden"}`}>Despachantes</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/processes"
                            className={`flex items-center space-x-2 p-2 rounded hover:bg-primary-50 text-gray-600 hover:text-primary-600 ${isOpen ? "w-full" : "w-16"
                                }`}
                        >
                            <UsersIcon className="w-5 h-5" />
                            <span className={`${isOpen ? "block" : "hidden"}`}>Processos</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
