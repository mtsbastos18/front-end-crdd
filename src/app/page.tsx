'use client';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Esta página será redirecionada automaticamente pelo middleware
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Carregando...</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    </div>
  );

}
