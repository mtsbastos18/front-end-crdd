import { z } from 'zod';

const phoneRegex = /^\([1-9]{2}\) [2-9][0-9]{3,4}\-[0-9]{4}$/;
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
const cepRegex = /^\d{5}\-\d{3}$/;

export const dispatcherValidation = z.object({
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    street: z.string().min(3, 'Campo obrigatório'),
    number: z.string().min(0, 'Campo obrigatório'),
    city: z.string().min(3, 'Campo obrigatório'),
    state: z.string().length(2, 'Campo obrigatório'),
    zipCode: z.string().max(8, 'CEP deve ter no máximo 8 caracteres'),
    email: z.string().email('Email inválido'),
    phone: z.string().max(15, 'Telefone deve ter no máximo 15 caracteres'),
    rg: z.string().min(1, 'Campo obrigatório'),
    cpf: z.string().regex(cpfRegex, 'CPF inválido. Formato: 999.999.999-99'),
    matricula: z.string().min(1, 'Campo obrigatório'),
    birthDate: z.string().optional().refine((date) => {
        if (!date) return true; // Se não houver data, é opcional
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime()) && parsedDate <= new Date();
    }, 'Data de nascimento inválida ou futura'),
});

export type DispatcherValidationSchema = z.infer<typeof dispatcherValidation>;