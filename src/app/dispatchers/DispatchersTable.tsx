'use client';

import {
    MagnifyingGlassIcon,
    FunnelIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { useDispatchers } from "./useDispatchers";
import { Pagination } from "@/components/Pagination";

export default function DispatchersTable() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const {
        dispatchers,
        loading,
        searchTerm,
        setSearchTerm,
        handleDelete,
        handleGetDispatchers,
        hasNextPage,
        hasPrevPage,
        page,
        setPage,
    } = useDispatchers();

    const [searchInput, setSearchInput] = useState(searchTerm);

    useEffect(() => {
        const pageParam = searchParams.get("page");
        const nameParam = searchParams.get("name") || "";

        const pageNumber = pageParam ? parseInt(pageParam, 10) : 1;
        setPage(pageNumber);
        setSearchTerm(nameParam);
        setSearchInput(nameParam); // Atualiza o input visível
        handleGetDispatchers(pageNumber, nameParam);
    }, [searchParams]);

    const handlePageChange = (newPage: number) => {
        const query = new URLSearchParams();
        if (searchTerm) query.set("name", searchTerm);
        query.set("page", newPage.toString());
        router.push(`/dispatchers?${query.toString()}`);
    };

    const handleSearchClick = () => {
        const query = new URLSearchParams();
        if (searchInput.trim()) query.set("name", searchInput.trim());
        query.set("page", "1"); // sempre começa da primeira página
        router.push(`/dispatchers?${query.toString()}`);
    };

    if (loading) return <Loading />;

    return (
        <div className="bg-white rounded-lg shadow p-6">
            {/* Busca */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="relative flex-1">
                    <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar despachantes..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
                <button
                    className="flex items-center space-x-2  bg-primary-600 px-4 py-2 rounded hover:bg-primary-700"
                    onClick={handleSearchClick}
                >
                    <FunnelIcon className="w-5 h-5" />
                    <span>Filtrar</span>
                </button>
            </div>

            {/* Tabela */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documento</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Matrícula</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {dispatchers.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                                    Nenhum despachante encontrado
                                </td>
                            </tr>
                        ) : (
                            dispatchers.map((dispatcher) => (
                                <tr key={dispatcher._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                                                <span className="text-primary-600 font-medium">
                                                    {dispatcher.name.charAt(0)}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{dispatcher.name}</div>
                                                <div className="text-sm text-gray-500">{dispatcher.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{dispatcher.cpf}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{dispatcher.matricula}</td>
                                    <td className="px-6 py-4 text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                title="Editar"
                                                className="text-primary-600 hover:text-primary-900"
                                                onClick={() => router.push(`/dispatchers/edit/${dispatcher._id}`)}
                                            >
                                                <PencilIcon className="w-5 h-5" />
                                            </button>
                                            <button
                                                title="Excluir"
                                                className="text-red-600 hover:text-red-900"
                                                onClick={() => handleDelete(dispatcher._id)}
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>


            <Pagination page={page} hasNextPage={hasNextPage} hasPrevPage={hasPrevPage} handlePageChange={handlePageChange} />
        </div>
    );
}
