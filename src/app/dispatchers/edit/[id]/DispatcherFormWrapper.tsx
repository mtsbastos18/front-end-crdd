'use client';

import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import DispatcherForm from '../../DispatcherForm';
import { Dispatcher } from '@/types/dispatcher';
import { fetchDispatcherById } from '@/lib/dispatchers.service';

export default function DispatcherFormWrapper({ id }: { id: string }) {
    const [dispatcher, setDispatcher] = useState<Dispatcher | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchDispatcher = useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchDispatcherById(id);
            if (!data) throw new Error('Despachante não encontrado');
            setDispatcher(data);
        } catch (error) {
            console.error('Erro ao carregar despachante:', error);
            toast.error('Erro ao carregar dados do despachante');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchDispatcher();
    }, [fetchDispatcher]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (!dispatcher) {
        return <div>Despachante não encontrado</div>;
    }

    return <DispatcherForm initialData={dispatcher} isEdit />;
}
