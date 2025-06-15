import { z } from 'zod';

export const processValidation = z.object({
    title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
    description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
    status: z.enum(['open', 'in progress', 'closed'], {
        errorMap: () => ({ message: 'Status inválido' }),
    }),
    priority: z.enum(['low', 'medium', 'high'], {
        errorMap: () => ({ message: 'Prioridade inválida' }),
    }),
    term: z.string().optional().refine((date) => {
        if (!date) return true; // Se não houver data, é opcional
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime()) && parsedDate >= new Date();
    }
        , 'Data do termo inválida ou passada'),
    dispatcher: z.string().min(1, 'Campo obrigatório'),
    dispatcherName: z.string().min(1, 'Campo obrigatório'),
});
export type ProcessValidationSchema = z.infer<typeof processValidation>;
