'use client';
import { useAuth } from "@/contexts/AuthContext";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

export default function Header() {
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        logout();
    }

    // Fecha o dropdown ao clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


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
                <div className="relative" ref={dropdownRef}>
                    <button
                        className="flex items-center space-x-2 focus:outline-none cursor-pointer"
                        onClick={() => setDropdownOpen((open) => !open)}
                    >
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                            {/* Você pode colocar a inicial do usuário aqui */}
                            <span className="text-primary-600 text-amber-500 font-bold">{user?.name?.charAt(0)}</span>
                        </div>
                        <span className="text-sm font-medium">{user?.name}</span>
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-20">
                            <button
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                onClick={() => {
                                    setDropdownOpen(false);
                                    // Redirecionar para página do usuário
                                    window.location.href = "/me";
                                }}
                            >
                                Meu Usuário
                            </button>
                            <button
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                                onClick={handleLogout}
                            >
                                Sair
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}