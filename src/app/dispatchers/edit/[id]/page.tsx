'use client';

import { useEffect, useState } from 'react';
import DispatcherForm from '../../DispatcherForm';
import { Dispatcher } from '@/types/dispatcher';
import { useDispatchers } from '../../useDispatchers';

export default function EditDispatcherPage({ params }: { params: { id: string } }) {
    const [dispatcher, setDispatcher] = useState<Dispatcher | null>(null);
    const [loading, setLoading] = useState(true);
    const { handleGetDispatcherById } = useDispatchers();

    useEffect(() => {
        const fetchDispatcher = async () => {
            try {
                const dispatcherId = params.id;
                const data = await handleGetDispatcherById(dispatcherId);
                if (!data) {
                    throw new Error('Despachante não encontrado');
                }
                setDispatcher(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDispatcher();
    }, [params.id]);

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