// src/components/Select.tsx
'use client';

import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { useEffect, useState } from 'react';

interface SelectProps {
    label: string;
    id: string;
    register: UseFormRegisterReturn;
    error?: FieldError;
    options: { value: string; label: string }[];
    className?: string;
    placeholder?: string;
    defaultValue?: string;
}

export function Select({
    label,
    id,
    register,
    error,
    options,
    className = '',
    placeholder,
    defaultValue,
}: SelectProps) {
    const [value, setValue] = useState(defaultValue || '');

    useEffect(() => {
        setValue(defaultValue || '');
    }, [defaultValue]);

    const selectBaseClass = 'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none';
    const selectNormalClass = 'border-gray-300 focus:ring-primary-500 focus:border-primary-500';
    const selectErrorClass = 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500';

    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <select
                id={id}
                {...register}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    register.onChange(e);
                }}
                onBlur={register.onBlur}
                className={`${selectBaseClass} ${error ? selectErrorClass : selectNormalClass}`}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error.message}</p>
            )}
        </div>
    );
}