'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Dispatcher } from '@/types/dispatcher';
import { useDispatchers } from '@/app/dispatchers/useDispatchers';
import { dispatcherValidation, DispatcherValidationSchema } from '@/validators/dispatcherValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '../../components/Input';
import { set } from 'zod';

interface DispatcherFormProps {
    initialData?: Dispatcher;
    isEdit?: boolean;
}

export default function DispatcherForm({ initialData, isEdit = false }: DispatcherFormProps) {
    const [cepLoading, setCepLoading] = useState(false);
    const { handleSubmit, loading, handleGetAddress } = useDispatchers();
    console.log('initialData', initialData)
    const methods = useForm<DispatcherValidationSchema>({
        resolver: zodResolver(dispatcherValidation),
        mode: 'onChange',
        defaultValues: {
            name: initialData?.name || '',
            email: initialData?.email || '',
            phone: initialData?.phones?.[0]?.number || '',
            street: initialData?.address?.[0]?.street || '',
            number: initialData?.address?.[0]?.number || undefined,
            complement: initialData?.address?.[0]?.complement || '',
            city: initialData?.address?.[0]?.city || '',
            state: initialData?.address?.[0]?.state || '',
            zipCode: initialData?.address?.[0]?.zipCode || '',
            rg: initialData?.rg || '',
            cpf: initialData?.cpf || '',
            matricula: initialData?.matricula || '',
            birthDate: initialData?.birthDate ? new Date(initialData.birthDate).toISOString().split('T')[0] : '',
        }
    });

    // Efeito para validar o formulário após carregar os dados iniciais
    useEffect(() => {
        if (initialData) {
            // Aguarda um pouco para garantir que os campos foram preenchidos
            const timer = setTimeout(() => {
                methods.trigger();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [initialData, methods]);

    const {
        register,
        handleSubmit: handleFormSubmit,
        formState: { errors, isValid, isDirty },
        watch,
        setValue,
        trigger,
    } = methods

    const cep = watch('zipCode');

    // Busca automática de CEP
    useEffect(() => {

        if (cep && cep.replace(/\D/g, '').length === 8) {
            setCepLoading(true);

            handleGetAddress(cep)
                ?.then(response => response.json())
                .then(data => {
                    if (data && !data.erro) {
                        setValue('street', data.logradouro, { shouldValidate: true });
                        // setValue('', data.bairro, { shouldValidate: true });
                        setValue('city', data.localidade, { shouldValidate: true });
                        setValue('state', data.uf, { shouldValidate: true });
                    } else {
                        trigger('zipCode'); // Triggers validation error if CEP is not found
                        toast.error('CEP não encontrado. Verifique o número e tente novamente.');
                    }
                })
                .catch(() => {
                    trigger('zipCode'); // Triggers validation error if fetch fails
                    toast.error('Erro ao buscar CEP. Verifique sua conexão e tente novamente.');
                })
                .finally(() => {
                    setCepLoading(false);
                });
        }
    }, [cep, setValue, trigger]);

    const onSubmit = async (data: DispatcherValidationSchema) => {
        await handleSubmit(data, initialData?._id);
    };

    // Estilo base para inputs
    const inputBaseClass = 'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none';
    const inputNormalClass = 'border-gray-300 focus:ring-primary-500 focus:border-primary-500';
    const inputErrorClass = 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500';

    return (
        <div className="space-y-6">
            <Link
                href="/dispatchers"
                className="flex items-center text-primary-600 hover:text-primary-800 mb-6"
            >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Voltar para lista
            </Link>

            <h1 className="text-2xl font-bold">
                {isEdit ? 'Editar Despachante' : 'Cadastrar Novo Despachante'}
            </h1>

            <div className="bg-white rounded-lg shadow p-6">
                <FormProvider {...methods}>
                    <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Campo Nome */}
                            <div>
                                <Input
                                    label="Nome Completo *"
                                    id="name"
                                    register={register('name')}
                                    error={errors.name}
                                />
                            </div>

                            {/* Campo Documento */}
                            <div>
                                <Input
                                    label="CPF *"
                                    id="cpf"
                                    register={register('cpf')}
                                    error={errors.cpf}
                                    mask='cpf'
                                />
                            </div>

                            {/* Campo RG */}
                            <div>
                                <Input
                                    label='RG *'
                                    id="rg"
                                    register={register('rg')}
                                    error={errors.rg}
                                />
                            </div>

                            {/* Campo Data de Nascimento */}
                            <div>
                                <Input
                                    label='Data de Nascimento *'
                                    id="birthDate"
                                    register={register('birthDate')}
                                    error={errors.birthDate}
                                    type='date'
                                />
                            </div>

                            {/* Campo Matrícula */}
                            <div>
                                <Input
                                    label='Matrícula *'
                                    id="matricula"
                                    register={register('matricula')}
                                    error={errors.matricula}
                                />
                            </div>

                            {/* Campo E-mail */}
                            <div>
                                <Input
                                    label='E-mail *'
                                    id="email"
                                    register={register('email')}
                                    error={errors.email}
                                />
                            </div>

                            {/* Campo Telefone */}
                            <div>
                                <Input
                                    label="Telefone"
                                    id="phone"
                                    register={register('phone')}
                                    error={errors.phone}
                                    mask="phone"
                                />
                            </div>

                            {/* Campo CEP */}
                            <div>
                                <Input
                                    label="CEP"
                                    id="zipCode"
                                    register={register('zipCode')}
                                    error={errors.zipCode}
                                    mask="cep"
                                    loading={cepLoading}
                                />
                            </div>


                            {/* Campo endereço */}
                            <div>
                                <Input
                                    label="Endereço"
                                    id="street"
                                    register={register('street')}
                                    error={errors.street}
                                    loading={cepLoading}

                                />
                            </div>
                            {/* Campo Número */}
                            <div>
                                <Input
                                    label="Número *"
                                    id="number"
                                    register={register('number')}
                                    error={errors.number}
                                />
                            </div>
                            {/* Campo Complemento */}
                            <div>
                                <Input
                                    label="Complemento"
                                    id="complement"
                                    register={register('complement')}
                                    error={errors.complement}
                                />
                            </div>
                            {/* Campo Cidade */}
                            <div>
                                <Input
                                    label="Cidade *"
                                    id="city"
                                    register={register('city')}
                                    error={errors.city}
                                    loading={cepLoading}

                                />
                            </div>
                            {/* Campo Estado */}
                            <div>
                                <Input
                                    label="Estado *"
                                    id="state"
                                    register={register('state')}
                                    error={errors.state}
                                    loading={cepLoading}

                                />
                            </div>

                        </div>

                        <div className="flex justify-end space-x-3">
                            <Link
                                href="/dispatchers"
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                                Cancelar
                            </Link>
                            <button
                                type="submit"
                                disabled={(!isValid && isDirty) || loading}
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
                                        {initialData ? 'Salvar Alterações' : 'Cadastrar Despachante'}
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

