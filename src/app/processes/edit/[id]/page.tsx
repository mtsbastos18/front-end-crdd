'use client';

import { useEffect, useState } from 'react';
import { ProcessForm } from '../../ProcessForm';
import { useProcesses } from '../../useProcesses';
import { Process } from '@/types/process';
import Loading from '@/components/Loading';

export default function EditProcessPage({ params }: any) {
    const [process, setProcess] = useState<Process | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);
    const { handleGetProcessById } = useProcesses();

    const refreshProcess = async () => {
        try {
            const processId = params.id;
            const data = await handleGetProcessById(processId);
            if (!data) {
                throw new Error('Processo não encontrado');
            }
            data.dispatcherName = data.dispatcher?.name;
            setProcess(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshProcess();
    }, [params.id, refreshKey]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loading />
            </div>
        );
    }

    return (
        <ProcessForm
            initialData={process || undefined}
            isEdit={true}
            onCommentAdded={() => setRefreshKey(prev => prev + 1)}
        />
    );
}