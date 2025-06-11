'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { fetchDispatchers, deleteDispatcher, createDispatcher, updateDispatcher, fetchDispatcherById } from '@/lib/dispatchers.service';
import { Dispatcher } from '@/types/dispatcher';
import { DispatcherValidationSchema } from '@/validators/dispatcherValidation';

export function useDispatchers() {
    const [dispatchers, setDispatchers] = useState<Dispatcher[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const handleGetDispatchers = async () => {
        try {
            setLoading(true);
            const response = await fetchDispatchers();
            setDispatchers(response);
        } catch (error) {
            toast.error('Erro ao carregar despachantes');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Criar ou atualizar despachante
    const handleSubmit = async (formData: DispatcherValidationSchema, id?: string) => {
        console.log('Form data:', formData);
        setLoading(true);
        const isEdit = !!id;

        try {
            const payload: any = {
                name: formData.name,
                email: formData.email,
                cpf: formData.cpf,
                rg: formData.rg,
                matricula: formData.matricula,
                birthDate: formData.birthDate ? new Date(formData.birthDate).toISOString() : null,
                address: {
                    street: formData.street,
                    number: formData.number,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                },
                phoneSchema: [
                    {
                        type: 'mobile',
                        number: formData.phone,
                    }
                ]
            }


            const response = !isEdit ? await createDispatcher(payload) : await updateDispatcher(id!, payload);

            const result = await response;

            toast.success(
                isEdit
                    ? 'Despachante atualizado com sucesso!'
                    : 'Despachante cadastrado com sucesso!'
            );

            router.push('/dispatchers');
        } catch (error) {
            toast.error(
                isEdit
                    ? 'Erro ao atualizar despachante'
                    : 'Erro ao cadastrar despachante'
            );
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (_id: string) => {
        if (confirm('Tem certeza que deseja excluir este despachante?')) {
            try {
                await deleteDispatcher(_id);
                setDispatchers(dispatchers.filter(d => d._id !== _id));
                toast.success('Despachante excluído com sucesso');
            } catch (error) {
                toast.error('Erro ao excluir despachante');
                console.error(error);
            }
        }
    };

    const handleGetDispatcherById = async (id: string) => {
        try {
            setLoading(true);
            const response = await fetchDispatcherById(id);
            const dispatcher = response;
            if (!dispatcher) {
                toast.error('Despachante não encontrado');
                return null;
            }
            return dispatcher;
        } catch (error) {
            toast.error('Erro ao buscar despachante');
            console.error(error);
            return null;
        } finally {
            setLoading(false);
        }
    }

    const filteredDispatchers = dispatchers?.filter(dispatcher =>
        dispatcher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dispatcher.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleGetAddress = (zipCode: string) => {
        if (zipCode && zipCode.replace(/\D/g, '').length === 8) {
            return fetch(`https://viacep.com.br/ws/${zipCode.replace(/\D/g, '')}/json/`);
        }
    }

    return {
        dispatchers: filteredDispatchers,
        loading,
        searchTerm,
        setSearchTerm,
        handleDelete,
        handleSubmit,
        handleGetDispatcherById,
        handleGetDispatchers,
        handleGetAddress
    };
}