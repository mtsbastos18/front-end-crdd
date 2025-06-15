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

interface ProcessFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export function ProcessForm({ initialData, isEdit = false }: ProcessFormProps) {
    const [showDispatcherModal, setShowDispatcherModal] = useState(false);

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
        console.log('Form data:', data);
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
                    </form>
                </FormProvider>
            </div>

        </div>

    );

}