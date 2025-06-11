'use client';

import { MagnifyingGlassIcon, FunnelIcon, PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatchers } from "./useDispatchers";
import React from "react";

export default function DispatchersTable() {
    const router = useRouter();
    const {
        dispatchers,
        loading,
        searchTerm,
        setSearchTerm,
        handleDelete,
        handleGetDispatchers
    } = useDispatchers();

    // Carregar despachantes ao montar o componente
    React.useEffect(() => {
        handleGetDispatchers();
    }, []);

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-8 bg-gray-200 rounded w-full"></div>
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-12 bg-gray-100 rounded w-full"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">

            {/* Filtros e Busca */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="relative flex-1">
                    <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar despachantes..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600">
                    <FunnelIcon className="w-5 h-5" />
                    <span>Filtrar</span>
                </button>
            </div>

            {/* Tabela */}
            <div className="overflow-x-auto">
                <table className="min-w-full div_ide-y div_ide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-w_ider">
                                Nome
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-w_ider">
                                Documento
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-w_ider">
                                Matricula
                            </th>

                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-w_ider">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white div_ide-y div_ide-gray-200">
                        {dispatchers.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                    Nenhum despachante encontrado
                                </td>
                            </tr>
                        ) : (
                            dispatchers.map((dispatcher) => (
                                <tr key={dispatcher._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
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
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {dispatcher.cpf}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {dispatcher.matricula}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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

            <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-500">
                    Mostrando <span className="font-medium">1</span> a <span className="font-medium">{dispatchers.length}</span> de <span className="font-medium">{dispatchers.length}</span> resultados
                </div>
                <div className="flex space-x-2">
                    <button
                        className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                        disabled
                    >
                        Anterior
                    </button>
                    <button
                        className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                        disabled
                    >
                        Próxima
                    </button>
                </div>
            </div>

        </div>
    );
}