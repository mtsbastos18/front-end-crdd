'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { createProcess, fetchProcesses, getProcessById, updateProcess, addComment, deleteComment, getStatusList } from '@/lib/processes.service';
import { Process, ProcessCommentFormData, ProcessStatus } from '@/types/process';
import { ProcessValidationSchema } from '@/validators/processValidation';

export function useProcesses() {
    const [processes, setProcesses] = useState<Process[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [limit,] = useState(10);
    const [, setTotalPages] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);
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

    const handleSubmit = async (data: ProcessValidationSchema, id?: string) => {
        setLoading(true);
        const isEdit = !!id;
        console.log('data', data)
        try {

            const response = !isEdit ? await createProcess(data) : await updateProcess(id!, data);
            await response;
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

    const handleAddComment = async (id: string, comment: ProcessCommentFormData) => {
        try {
            const response = await addComment(id, comment);
            return response;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    const handleDeleteComment = async (processId: string, commentId: string) => {
        setLoading(true);
        try {
            const response = await deleteComment(processId, commentId);
            toast.success('Comentário excluído com sucesso!');

            return response;
        } catch (error) {
            console.error(error);
            toast.error('Erro ao excluir comentário');
            return null;
        } finally {
            setLoading(false);
        }
    }

    const handleGetProcessStatus = async () => {
        try {
            const response = await getStatusList();
            const status: ProcessStatus[] = response;

            return status;
        } catch (error) {
            console.error(error);
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
        handleAddComment,
        handleDeleteComment,
        handleGetProcessStatus
    };
}