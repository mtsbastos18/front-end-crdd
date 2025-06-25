'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { createProcess, fetchProcesses, getProcessById, updateProcess, addComment } from '@/lib/processes.service';
import { Process, ProcessComment } from '@/types/process';
import { ProcessValidationSchema } from '@/validators/processValidation';

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
            console.log(response.data);

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

    const handleSubmit = async (data: ProcessValidationSchema, id?: string) => {
        setLoading(true);
        const isEdit = !!id;

        try {

            const response = !isEdit ? await createProcess(data) : await updateProcess(id!, data);
            const result = await response;
            toast.success(
                isEdit
                    ? 'Processo atualizado com sucesso!'
                    : 'Processo cadastrado com sucesso!'
            );
            router.push('/processes');
        } catch (error) {
            toast.error(
                isEdit
                    ? 'Erro ao atualizar processo'
                    : 'Erro ao cadastrar processo'
            );
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleGetProcessById = async (id: string) => {
        try {
            const response = await getProcessById(id);
            return response;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    const handleAddComment = async (id: string, comment: ProcessComment) => {
        try {
            const response = await addComment(id, comment);
            return response;
        } catch (error) {
            console.error(error);
            return null;
        }
    }


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
        handleSubmit,
        handleGetProcessById,
        handleAddComment
    };
}