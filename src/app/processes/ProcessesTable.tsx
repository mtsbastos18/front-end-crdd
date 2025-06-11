'use client';

import { MagnifyingGlassIcon, FunnelIcon, PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React from "react";
import { useProcesses } from "./useProcesses"; // Certifique-se de que o caminho está correto
import { Process } from "@/types/process"; // Certifique-se de que o caminho está correto
import Loading from "@/components/Loading";

export default function ProcessesTable() {
    const router = useRouter();
    const {
        processes,
        loading,
        searchTerm,
        setSearchTerm,
        handleGetProcesses
    } = useProcesses();

    React.useEffect(() => {
        handleGetProcesses();
    }, []);

    if (loading) {
        return (
            <Loading />
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
                        placeholder="Buscar processos..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    // value={searchTerm}
                    // onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600">
                    <FunnelIcon className="w-5 h-5" />
                    <span>Filtrar</span>
                </button>
            </div>

            {/* Tabela */}
            <div className="overflow-x-auto">
                {/* Aqui você renderiza a tabela de processos */}
                <table className="min-w-full div_ide-y div_ide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titulo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prioridade</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prazo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Despachante</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {/* Aqui você renderiza as linhas dos processos */}
                        {/* Exemplo de linha */}
                        {processes.map((process: Process) => (
                            <tr key={process._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{process.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{process.priority}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(process.term).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{process.dispatcher}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{process.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        <PencilIcon className="w-5 h-5 inline" />
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-900 ml-2"
                                    >
                                        <TrashIcon className="w-5 h-5 inline" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {/* Adicione mais linhas conforme necessário */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

