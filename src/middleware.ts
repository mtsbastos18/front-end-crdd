// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('authToken')?.value;
    const { pathname } = request.nextUrl;
    console.log(pathname)

    // 1. Rotas públicas - permitir acesso direto
    const publicPaths = ['/login', '/forgot-password', '/reset-password', '/api/auth'];

    // Se está em outra rota pública e não tem token, permite acesso
    if (publicPaths.some(p => pathname.startsWith(p))) {
        return NextResponse.next();
    }

    // 2. Se está na rota raiz, redirecionar para login ou dashboard
    if (pathname === '/') {
        console.log('Token:', token);
        if (!token) {
            return redirectToLogin(request, pathname);
        }
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // 3. Se não tem token e não está em uma rota pública, redireciona para login
    if (!token) {
        return redirectToLogin(request, pathname);
    }

    // 3. Validação básica do token no cliente (sem chamar backend)
    try {
        // Verifica se o token existe e tem formato JWT básico
        if (!isValidJWT(token)) {
            throw new Error('Token inválido');
        }

        // Verificação opcional da expiração (client-side)
        if (isTokenExpired(token)) {
            throw new Error('Token expirado');
        }

        // Token parece válido - permitir acesso
        return NextResponse.next();

    } catch (error) {
        console.error('Validação do token falhou:', error);
        return redirectToLogin(request, pathname);
    }
}

// Funções auxiliares para validação client-side
function isValidJWT(token: string): boolean {
    // Verificação básica de estrutura JWT
    return token.split('.').length === 3;
}

function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp) {
            return payload.exp * 1000 < Date.now();
        }
        return false;
    } catch {
        return true; // Se não consegue decodificar, considera expirado
    }
}

function redirectToLogin(request: NextRequest, originalPath: string) {
    const loginUrl = new URL('/login', request.nextUrl.origin);
    // Mantém a URL original para redirecionamento pós-login
    if (!originalPath.startsWith('/login')) {
        loginUrl.searchParams.set('redirect', originalPath);
    }

    const response = NextResponse.redirect(loginUrl);
    // Remove o cookie inválido se existir
    response.cookies.delete('authToken');

    return response;
}

export const config = {
    matcher: [
        '/',  // Adicionando a rota raiz
        '/dashboard/:path*',
        '/profile',
        '/processes/:path*',
        '/dispatchers/:path*',
        '/settings/:path*',
        '/reports/:path*'
    ],
};