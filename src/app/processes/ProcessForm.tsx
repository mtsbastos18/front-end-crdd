'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { ArrowLeftIcon, CheckIcon, ChatBubbleLeftRightIcon, PlusIcon, MagnifyingGlassIcon, TrashIcon } from '@heroicons/react/24/outline';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components/Input';
import { processValidation } from '@/validators/processValidation';
import { Select } from '@/components/Select';
import React, { useEffect } from 'react';
import { DispatcherModal } from '../dispatchers/DispatcherModal';
import { useProcesses } from './useProcesses';
import { Process, ProcessComment, ProcessStatus } from '@/types/process';
import ProcessUploadFiles from './ProcessUploadFiles';
interface ProcessFormProps {
    initialData?: Process;
    isEdit?: boolean;
    onCommentAdded?: () => void;
}

export function ProcessForm({ initialData, isEdit = false, onCommentAdded }: ProcessFormProps) {
    const [processStatus, setProcessStatus] = useState<ProcessStatus[]>([]);
    const [showDispatcherModal, setShowDispatcherModal] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [showUploadFilesModal, setShowUploadFilesModal] = useState(false);
    const [newComment, setNewComment] = useState('');
    const { loading, handleSubmit:
        submitProcess,
        handleAddComment,
        handleGetProcessById,
        handleDeleteComment,
        handleGetProcessStatus,
    } = useProcesses();

    const getProcessStatus = async () => {
        const status = await handleGetProcessStatus();
        setProcessStatus(status || []);
    }

    useEffect(() => {
        getProcessStatus();
    }, []);

    // Define the form data type
    type ProcessFormData = {
        title: string;
        description: string;
        status: string;
        priority: 'low' | 'medium' | 'high';
        term: string;
        dispatcher: string;
        dispatcherName: string;
    };

    // Convert initialData to match ProcessFormData type
    const defaultValues: ProcessFormData = {
        title: initialData?.title || '',
        description: initialData?.description || '',
        status: initialData?.status._id || '',
        priority: initialData?.priority || 'low',
        term: initialData?.term || '',
        dispatcher: typeof initialData?.dispatcher === 'string'
            ? initialData.dispatcher
            : initialData?.dispatcher?._id || '',
        dispatcherName: initialData?.dispatcherName || ''
    };

    const methods = useForm({
        resolver: zodResolver(processValidation),
        mode: 'onChange',
        defaultValues
    });

    const router = useRouter();
    const { register, formState: { errors, isValid }, setValue, trigger } = methods;

    const handleFormSubmit = async (formData: ProcessFormData) => {
        try {
            console.log('processo', formData)
            if (isEdit && initialData?._id) {
                await submitProcess(formData, initialData._id);
            } else {
                await submitProcess(formData);
            }
            router.push('/processes');
        } catch (error) {
            toast.error(`Erro ao ${isEdit ? 'atualizar' : 'criar'} o processo. Tente novamente.`);
            console.error('Erro ao processar o formulário:', error);
        }
    };

    const handleAddNewComment = async () => {
        if (!newComment.trim() || !initialData?._id) return;

        try {
            // Adiciona o novo comentário
            await handleAddComment(initialData._id, {
                text: newComment,
            });

            // Chama a função de callback para atualizar a página pai
            if (onCommentAdded) {
                onCommentAdded();
            }

            // Busca os dados atualizados do processo
            const updatedProcess = await handleGetProcessById(initialData._id);

            if (updatedProcess) {
                // Atualiza apenas os comentários no estado local
                initialData = {
                    ...initialData,
                    comments: updatedProcess.comments || []
                };
                // Força o re-render do componente mantendo os valores atuais
                methods.reset({
                    ...methods.getValues(),
                });
            }

            setNewComment('');
            setShowCommentModal(false);
            toast.success('Comentário adicionado com sucesso!');
        } catch (error) {
            toast.error('Erro ao adicionar comentário');
            console.error(error);
        }
    };

    const deleteComment = async (commentId: string) => {
        if (!initialData) {
            console.error('No process data available');
            return;
        }
        const response = await handleDeleteComment(initialData._id || '', commentId);
        if (response) {
            if (onCommentAdded) {
                onCommentAdded();
            }
        }
    };

    const renderComments = () => {
        return (
            <div className="space-y-4">
                {initialData?.comments?.map((comment: ProcessComment) => (
                    <div key={comment._id} className='flex items-center justify-between'>
                        <div className="border-b border-gray-200 pb-4">
                            <p className="text-sm font-medium text-gray-900">{comment.user.name}</p>
                            <p className="text-sm text-gray-500">
                                {new Date(comment.createdAt).toLocaleString('pt-BR')}
                            </p>
                            <p className="mt-1 text-sm text-gray-700">{comment.text}</p>
                        </div>
                        <button
                            className="text-red-600 hover:text-red-900 ml-2"
                            onClick={() => deleteComment(comment._id)}
                        >
                            <TrashIcon className="w-5 h-5 inline" />
                        </button>
                    </div>
                ))}
            </div>
        );
    };


    return (
        <div className="space-y-6">
            <Link
                href="/processes"
                className="flex items-center text-primary-600 hover:text-primary-800 mb-6"
            >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Voltar para lista
            </Link>

            <h1 className="text-2xl font-bold">
                {isEdit ? 'Editar Processo' : 'Cadastrar Novo Processo'}
            </h1>

            <div className="bg-white rounded-lg shadow p-6">
                <FormProvider {...methods}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        methods.handleSubmit(handleFormSubmit)(e);
                    }} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                            <div>
                                <Input
                                    label="Título"
                                    id="title"
                                    register={register('title')}
                                    error={errors.title}
                                    placeholder="Título do processo"
                                />
                            </div>

                            <div>
                                <Input
                                    label="Descrição"
                                    id="description"
                                    register={register('description')}
                                    error={errors.description}
                                    placeholder="Descrição do processo"
                                    type="textarea"
                                    textarea={true}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Select
                                    label="Status *"
                                    id="status"
                                    register={register('status')}
                                    error={errors.status}
                                    options={processStatus.filter(s => s._id && s.name).map(s => ({ value: s._id!, label: s.name! }))}
                                    placeholder="Selecione um status"
                                    defaultValue={initialData?.status._id || 'active'}
                                />
                            </div>
                            <div>
                                <Select
                                    label="Prioridade *"
                                    id="priority"
                                    register={register('priority')}
                                    error={errors.priority}
                                    options={[
                                        { value: 'low', label: 'Baixa' },
                                        { value: 'medium', label: 'Média' },
                                        { value: 'high', label: 'Alta' },
                                    ]}
                                    placeholder="Selecione uma prioridade"
                                    defaultValue={initialData?.priority || 'low'}
                                />
                            </div>
                            <div>
                                <Input
                                    label="Prazo"
                                    id="term"
                                    register={register('term')}
                                    error={errors.term}
                                    placeholder="Prazo"
                                    type="date"
                                />
                            </div>
                            <div className='grid grid-cols-5 gap-2 items-end'>
                                <Input
                                    label="Despachante *"
                                    id="dispatcher"
                                    register={register('dispatcherName')}
                                    error={errors.dispatcher}
                                    placeholder="Selecione um despachante"
                                    className='col-span-4'
                                    readonly={true} // Campo somente leitura
                                />
                                <input type='hidden' {...register('dispatcher')} />
                                <button
                                    type="button"
                                    className="px-3 py-2 bg-primary-600 border border-amber-600 text-amber-600 rounded cursor-pointer"
                                    onClick={() => setShowDispatcherModal(true)}
                                >
                                    <MagnifyingGlassIcon className="w-5 h-5 inline mr-1" />
                                    Buscar
                                </button>

                                {showDispatcherModal && (
                                    <DispatcherModal
                                        onSelect={(id: string, name: string) => {
                                            setValue('dispatcher', id);
                                            setValue('dispatcherName', name);
                                            setShowDispatcherModal(false);
                                            trigger('dispatcher');
                                        }}
                                        onClose={() => setShowDispatcherModal(false)}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <Link
                                href="/processes"
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                                Cancelar
                            </Link>
                            <button
                                type="submit"
                                disabled={!isValid || loading}
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processando...
                                    </>
                                ) : (
                                    <>
                                        <CheckIcon className="w-5 h-5 mr-2" />
                                        {initialData ? 'Salvar Alterações' : 'Cadastrar Processo'}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </div>

            {isEdit && (
                <>
                    <ProcessUploadFiles processId={initialData?._id || ''} processFiles={initialData?.files} />
                    {/* Seção de Comentários */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2 text-gray-500" />
                                <h2 className="text-lg font-medium">Comentários</h2>
                            </div>
                            <button
                                onClick={() => setShowCommentModal(true)}
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center disabled:opacity-50"
                            >
                                <PlusIcon className="w-4 h-4 mr-1" />
                                Novo Comentário
                            </button>
                        </div>

                        {renderComments()}
                    </div>

                    {/* Modal para Novo Comentário */}
                    {showCommentModal && (
                        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                                <h3 className="text-lg font-medium mb-4">Adicionar Comentário</h3>
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                                    rows={4}
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Digite seu comentário..."
                                />
                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={() => setShowCommentModal(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-sm"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleAddNewComment}
                                        disabled={!newComment.trim()}
                                        className="px-4 py-2 border border-amber-600 text-amber-600 rounded-md text-sm disabled:opacity-50"
                                    >
                                        Adicionar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}