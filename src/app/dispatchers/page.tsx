'use client';

import { Suspense } from 'react';
import DispatchersTable from './DispatchersTable';
import DispatchersLoading from './DispatchersLoading';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/16/solid';

export default function DispatchersPage() {
    return (
        <div className="space-y-6">
            {/* Cabeçalho e outros elementos estáticos */}

            <Suspense fallback={<DispatchersLoading />}>
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Despachantes</h1>
                    <Link
                        href="/dispatchers/new"
                        className="flex items-center space-x-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        <PlusIcon className="w-5 h-5" />
                        <span>Novo Despachante</span>
                    </Link>
                </div>
                <DispatchersTable />
            </Suspense>
        </div>
    );
}