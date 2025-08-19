// src/components/Input.tsx
'use client';

import { UseFormRegisterReturn, FieldError, useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';

interface InputProps {
    label: string;
    id: string;
    type?: string;
    register: UseFormRegisterReturn;
    error?: FieldError;
    mask?: 'phone' | 'cpf' | 'cnpj' | 'cep';
    className?: string;
    placeholder?: string;
    onBlur?: () => void;
    loading?: boolean;
    textarea?: boolean; // Novo prop para textarea
    rows?: number;
    readonly?: boolean; // Novo prop para tornar o campo somente leitura
}

export function Input({
    label,
    id,
    type = 'text',
    register,
    error,
    mask,
    className = '',
    placeholder,
    onBlur,
    loading = false,
    textarea = false, // Novo prop para textarea
    rows = 5, // Número de linhas padrão para textarea
    readonly = false, // Novo prop para tornar o campo somente leitura
}: InputProps) {
    const { watch } = useFormContext();
    const fieldName = register.name;
    const fieldValue = watch(fieldName);
    const [value, setValue] = useState(fieldValue || '');

    // Atualiza o valor quando o campo do formulário muda (útil para reset/resetForm)
    useEffect(() => {
        setValue(fieldValue || '');
    }, [fieldValue]);

    useEffect(() => {
        if (mask && value) {
            let maskedValue = value;

            if (mask === 'phone') {
                maskedValue = value
                    .replace(/\D/g, '')
                    .replace(/^(\d{2})(\d)/g, '($1) $2')
                    .replace(/(\d)(\d{4})$/, '$1-$2');
            } else if (mask === 'cpf') {
                maskedValue = value
                    .replace(/\D/g, '')
                    .replace(/(\d{3})(\d)/, '$1.$2')
                    .replace(/(\d{3})(\d)/, '$1.$2')
                    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            } else if (mask === 'cnpj') {
                maskedValue = value
                    .replace(/\D/g, '')
                    .replace(/^(\d{2})(\d)/, '$1.$2')
                    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
                    .replace(/\.(\d{3})(\d)/, '.$1/$2')
                    .replace(/(\d{4})(\d)/, '$1-$2');
            } else if (mask === 'cep') {
                maskedValue = value
                    .replace(/\D/g, '')
                    .replace(/^(\d{5})(\d)/, '$1-$2');
            }

            setValue(maskedValue);
        }
    }, [value, mask]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        // Remove máscara antes de enviar para o formulário
        if (mask) {
            const unmaskedValue = newValue.replace(/\D/g, '');
            register.onChange({
                target: {
                    name: register.name,
                    value: unmaskedValue
                }
            });
        } else {
            register.onChange(e);
        }

        setValue(newValue);
    };

    const inputBaseClass = 'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none';
    const inputNormalClass = 'border-gray-300 focus:ring-primary-500 focus:border-primary-500';
    const inputErrorClass = 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500';

    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
                {loading && (
                    <span className="ml-2">
                        <svg className="animate-spin h-4 w-4 text-gray-500 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </span>
                )}
            </label>
            {textarea ? (
                <textarea
                    id={id}
                    value={value || ''}
                    {...register}
                    onBlur={(e) => {
                        register.onBlur(e);
                        onBlur?.();
                    }}
                    placeholder={placeholder}
                    className={`${inputBaseClass} ${error ? inputErrorClass : inputNormalClass}`}
                    disabled={loading}
                    rows={rows}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    value={value || ''}
                    {...register}
                    onChange={handleChange}
                    onBlur={(e) => {
                        register.onBlur(e);
                        onBlur?.();
                    }}
                    placeholder={placeholder}
                    className={`${inputBaseClass} ${error ? inputErrorClass : inputNormalClass}`}
                    disabled={loading}
                    readOnly={readonly} // Adiciona a propriedade readonly
                />
            )}
            {error && (
                <p className="mt-1 text-sm text-red-600">{error.message}</p>
            )}
        </div>
    );
}