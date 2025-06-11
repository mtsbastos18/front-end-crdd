import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Header() {
    return (
        <header className="fixed top-0 left-64 right-0 bg-white shadow-sm p-4 flex justify-between items-center z-10">
            <div className="relative w-64">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Pesquisar..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-100 relative">
                    <BellIcon className="w-5 h-5 text-gray-500" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-600 font-medium">JS</span>
                    </div>
                    <span className="text-sm font-medium">John Smith</span>
                </div>
            </div>
        </header>
    );
}