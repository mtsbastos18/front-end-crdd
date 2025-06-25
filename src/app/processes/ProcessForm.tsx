'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '../../components/Input';
import { set } from 'zod';
import { processValidation, ProcessValidationSchema } from '@/validators/processValidation';
import { Select } from '@/components/Select';
import React from 'react';
import { DispatcherModal } from '../dispatchers/DispatcherModal';
import { useProcesses } from './useProcesses';

interface ProcessFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export function ProcessForm({ initialData, isEdit = false }: ProcessFormProps) {
    const [showDispatcherModal, setShowDispatcherModal] = useState(false);
    const { loading, handleSubmit } = useProcesses();
    const methods = useForm<ProcessValidationSchema>({
        resolver: zodResolver(processValidation),
        mode: 'onChange',
        defaultValues: initialData || {
            title: '',
            description: '',
            status: 'open',
            priority: 'low',
            term: '',
            dispatcher: '',
            dispatcherName: ''
        }
    });

    const {
        register,
        handleSubmit: handleFormSubmit,
        formState: { errors, isValid, isDirty },
        watch,
        setValue,
        trigger,
    } = methods

    const onSubmit = async (data: ProcessValidationSchema) => {
        handleSubmit(data, initialData?._id);
    }

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
                    <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-6">
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
                                    options={[
                                        { value: 'open', label: 'Aberto' },
                                        { value: 'closed', label: 'Inativo' },
                                    ]}
                                    placeholder="Selecione um status"
                                    defaultValue={initialData?.status || 'active'}
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

        </div>

    );

}