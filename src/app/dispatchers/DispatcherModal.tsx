import React from 'react';
import { useDispatchers } from './useDispatchers';
import { Dispatcher } from '@/types/dispatcher';
import SelectionButton from '@/components/SelectionButton';

export function DispatcherModal({ onSelect, onClose }: { onSelect: (id: string, name: string) => void, onClose: () => void }) {
    const {
        dispatchers,
        handleGetDispatchers
    } = useDispatchers();

    const [search, setSearch] = React.useState('');

    // Carregar despachantes ao montar o componente
    React.useEffect(() => {
        handleGetDispatchers(1, '');
    }, []);

    // Filtrar despachantes pelo nome ou email
    const filteredDispatchers = dispatchers.filter((d: Dispatcher) =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-2xl w-full">
                <h2 className="text-lg font-bold mb-4">Selecione um despachante</h2>
                <input
                    type="text"
                    placeholder="Buscar por nome ou e-mail"
                    className="mb-4 w-full px-3 py-2 border border-gray-300 rounded"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <ul className='divide-y divide-gray-100 max-h-60 overflow-y-auto'>
                    {filteredDispatchers.map((d: Dispatcher) => (
                        <li key={d._id} className='flex justify-between gap-x-6 py-5'>
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm/6 font-semibold text-gray-900">{d.name}</p>
                                <p className="mt-1 truncate text-xs/5 text-gray-500">{d.email}</p>
                            </div>
                            <SelectionButton onClick={() => { onSelect(d._id, d.name); onClose(); }} />
                        </li>
                    ))}
                    {filteredDispatchers.length === 0 && (
                        <li className="py-4 text-center text-gray-400">Nenhum despachante encontrado.</li>
                    )}
                </ul>
                <button
                    className="mt-4 px-4 py-2 bg-gray-300 rounded"
                    onClick={onClose}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}