// src/components/Input.tsx
'use client';

import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { useCallback } from 'react';

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
    textarea?: boolean;
    rows?: number;
    readonly?: boolean;
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
    textarea = false,
    rows = 5,
    readonly = false,
}: InputProps) {
    // Aplica a máscara de acordo com o tipo
    const applyMask = useCallback((value: string) => {
        if (!mask) return value;

        const digits = value.replace(/\D/g, '');

        switch (mask) {
            case 'phone':
                return digits
                    .replace(/^(\d{2})(\d)/g, '($1) $2')
                    .replace(/(\d)(\d{4})$/, '$1-$2');
            case 'cpf':
                return digits
                    .replace(/(\d{3})(\d)/, '$1.$2')
                    .replace(/(\d{3})(\d)/, '$1.$2')
                    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            case 'cnpj':
                return digits
                    .replace(/^(\d{2})(\d)/, '$1.$2')
                    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
                    .replace(/\.(\d{3})(\d)/, '.$1/$2')
                    .replace(/(\d{4})(\d)/, '$1-$2');
            case 'cep':
                return digits.replace(/^(\d{5})(\d)/, '$1-$2');
            default:
                return value;
        }
    }, [mask]);

    // Trata a mudança de valor
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let newValue = e.target.value;

        if (mask) {
            const digits = newValue.replace(/\D/g, '');
            newValue = applyMask(newValue);

            // envia valor sem máscara para o RHF
            register.onChange({
                target: {
                    name: register.name,
                    value: digits,
                },
            });
        } else {
            register.onChange(e);
        }

        e.target.value = newValue; // garante exibição mascarada
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
                        <svg
                            className="animate-spin h-4 w-4 text-gray-500 inline"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 
                1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    </span>
                )}
            </label>

            {textarea ? (
                <textarea
                    id={id}
                    {...register}
                    onChange={handleChange}
                    onBlur={(e) => {
                        register.onBlur(e);
                        onBlur?.();
                    }}
                    placeholder={placeholder}
                    className={`${inputBaseClass} ${error ? inputErrorClass : inputNormalClass}`}
                    disabled={loading}
                    rows={rows}
                    readOnly={readonly}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    {...register}
                    onChange={handleChange}
                    onBlur={(e) => {
                        register.onBlur(e);
                        onBlur?.();
                    }}
                    placeholder={placeholder}
                    className={`${inputBaseClass} ${error ? inputErrorClass : inputNormalClass}`}
                    disabled={loading}
                    readOnly={readonly}
                />
            )}

            {error && (
                <p className="mt-1 text-sm text-red-600">{error.message}</p>
            )}
        </div>
    );
}
