'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { fetchProcesses } from '@/lib/processes.service';
import { Process } from '@/types/process';

export function useProcesses() {
    const [processes, setProcesses] = useState<Process[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);
    const [dispatchers, setDispatchers] = useState<Process[]>([]);
    const router = useRouter();

    const handleGetProcesses = async (pageNumber: number, search = '') => {
        try {
            setLoading(true);
            const response = await fetchProcesses(pageNumber, limit, search);
            setProcesses(response.data);
            setTotalPages(response.meta.totalPages);
            setHasNextPage(response.meta.hasNextPage);
            setHasPrevPage(response.meta.hasPrevPage);
        } catch (error) {
            toast.error('Erro ao carregar processos');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    return {
        processes,
        loading,
        searchTerm,
        setSearchTerm,
        handleGetProcesses,
        router,
        hasNextPage,
        hasPrevPage,
        page,
        setPage,
    };
}