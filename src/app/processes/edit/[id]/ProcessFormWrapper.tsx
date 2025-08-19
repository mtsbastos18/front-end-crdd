'use client';

import { useEffect, useState } from "react";
import { ProcessForm } from "../../ProcessForm";
import Loading from "@/components/Loading";
import { Process } from "@/types/process";
import { useProcesses } from "../../useProcesses";


export default function ProcessFormWrapper({ id }: { id: string }) {
    const [process, setProcess] = useState<Process | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);
    const { handleGetProcessById } = useProcesses();

    const refreshProcess = async () => {
        try {
            const processId = id;
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
    }, [id, refreshKey]);

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