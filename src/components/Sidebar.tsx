import Link from "next/link";
import { HomeIcon, ChartBarIcon, CogIcon, UsersIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
    return (
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg p-4">
            <div className="flex items-center space-x-2 mb-8 p-2">
                <div className="w-8 h-8 bg-primary-500 rounded"></div>
                <span className="font-bold text-xl">CRDD</span>
            </div>

            <nav>
                <ul className="space-y-2">
                    <li>
                        <Link href="/dashboard" className="flex items-center space-x-2 p-2 rounded hover:bg-primary-50 text-primary-600">
                            <HomeIcon className="w-5 h-5" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/dispatchers" className="flex items-center space-x-2 p-2 rounded hover:bg-primary-50 text-gray-600 hover:text-primary-600">
                            <UsersIcon className="w-5 h-5" />
                            <span>Despachantes</span>
                        </Link>
                    </li>

                </ul>
            </nav>
        </div>
    );
}