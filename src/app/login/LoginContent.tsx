'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Input } from '@/components/Input';
import { FormProvider, useForm } from 'react-hook-form';

export default function LoginContent() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, token } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const redirect = searchParams.get('redirect') || '/dashboard';

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const { register, handleSubmit: handleFormSubmit } = methods;

    const handleSubmit = async (data: { email: string; password: string }) => {
        setLoading(true);
        setError('');

        try {
            await login(data.email, data.password);
            router.push(redirect);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro desconhecido ao fazer login');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            router.push('/dashboard');
        }
    }, [token, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Acesse sua conta
                </h2>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                <FormProvider {...methods}>
                    <form className="mt-8 space-y-6" onSubmit={handleFormSubmit(handleSubmit)}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <Input
                                label="Email"
                                id="email"
                                type="email"
                                register={register('email')}
                                placeholder="seu@email.com"
                            />
                            <Input
                                label="Senha"
                                id="password"
                                type="password"
                                register={register('password')}
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Lembrar de mim
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link href="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
                                    Esqueceu sua senha?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-500 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Carregando...
                                    </>
                                ) : (
                                    'Entrar'
                                )}
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}
