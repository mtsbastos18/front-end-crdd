// src/components/AuthGuard.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface AuthGuardProps {
    children: React.ReactNode;
    requiredRoles?: string[];
}

export function AuthGuard({ children, requiredRoles }: AuthGuardProps) {
    const { isAuthenticated, user, loading, refreshToken } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated) {
                router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
            } else if (requiredRoles && !requiredRoles.some(role => user?.roles.includes(role))) {
                router.push('/unauthorized');
            }
        }
    }, [isAuthenticated, loading, router, requiredRoles, user?.roles]);

    useEffect(() => {
        const checkToken = async () => {
            await refreshToken();
        };

        const interval = setInterval(checkToken, 5 * 60 * 1000); // Verifica a cada 5 minutos
        return () => clearInterval(interval);
    }, [refreshToken]);

    if (loading || !isAuthenticated || (requiredRoles && !requiredRoles.some(role => user?.roles.includes(role)))) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return <>{children}</>;
}