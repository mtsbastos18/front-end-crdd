'use client';

import { useEffect, useState } from 'react';
import { ProcessForm } from '../../ProcessForm';
import { useProcesses } from '../../useProcesses';
import { Process } from '@/types/process';
import Loading from '@/components/Loading';

export default function EditProcessPage({ params }: { params: { id: string } }) {
    const [process, setProcess] = useState<Process | null>(null);
    const [loading, setLoading] = useState(true);
    const { handleGetProcessById } = useProcesses();

    useEffect(() => {
        const fetchProcess = async () => {
            try {
                const processId = params.id;
                let data = await handleGetProcessById(processId);
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

        fetchProcess();
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loading />
            </div>
        );
    }

    return (
        <ProcessForm initialData={process} isEdit />
    );
}