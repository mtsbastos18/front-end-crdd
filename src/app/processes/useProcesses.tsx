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
    const router = useRouter();

    const handleGetProcesses = async () => {
        try {
            setLoading(true);
            const response = await fetchProcesses();
            console.log('Fetched processes:', response);
            setProcesses(response);
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
        router
    };
}