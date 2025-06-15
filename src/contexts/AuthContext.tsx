// src/contexts/AuthContext.tsx
'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface User {
    exp: number;
    id: string;
    name: string;
    email: string;
    roles: string[];
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: any;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
    refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const initializeAuth = async () => {
            const storedToken = Cookies.get('authToken');

            if (storedToken) {
                try {
                    const userData = jwtDecode<User>(storedToken);
                    setUser(userData);
                    setToken(storedToken);

                    // Verifica se o token está expirado
                    if (userData.exp && userData.exp * 1000 < Date.now()) {
                        await refreshToken();
                    }
                } catch (error) {
                    console.error('Token inválido:', error);
                    logout();
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            setLoading(true); // Adicione esta linha para garantir o estado de loading

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Credenciais inválidas');
            }

            const { token, user } = await response.json();
            const userData = jwtDecode<User>(token);

            // Garanta que está salvando o token corretamente
            Cookies.set('authToken', token, {
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                expires: new Date(userData.exp * 1000), // Use a expiração do token
            });

            setUser(userData);
            setToken(token);

            // Retorne os dados do usuário em vez de redirecionar aqui
            return userData;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const refreshToken = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/auth/refresh`, {
                method: 'POST',
                credentials: 'include', // Para cookies de refresh token
            });

            if (!response.ok) {
                throw new Error('Falha ao renovar token');
            }

            const { token } = await response.json();
            const userData = jwtDecode<User>(token);

            setUser(userData);
            setToken(token);
            Cookies.set('authToken', token, {
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                expires: 1,
            });
        } catch (error) {
            console.error('Refresh token failed:', error);
            logout();
        }
    };

    const logout = () => {
        // Chamada opcional para endpoint de logout do backend
        // fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/auth/logout`, {
        //     method: 'POST',
        //     credentials: 'include',
        // }).catch(console.error);
        console.log('fazer logout')
        setUser(null);
        setToken(null);
        Cookies.remove('authToken');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            logout,
            isAuthenticated: !!user,
            loading,
            refreshToken,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}