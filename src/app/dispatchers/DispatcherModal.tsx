import React from 'react';
import { useDispatchers } from './useDispatchers';
import { Dispatcher } from '@/types/dispatcher';
import SelectionButton from '@/components/SelectionButton';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export function DispatcherModal({ onSelect, onClose }: { onSelect: (id: string, name: string) => void, onClose: () => void }) {
    const {
        dispatchers,
        handleGetDispatchers,
        searchTerm,
    } = useDispatchers();

    const [search, setSearch] = React.useState(searchTerm);

    // Carregar despachantes ao montar o componente
    React.useEffect(() => {
        handleGetDispatchers(1, '');
    }, []);


    const handleSearchClick = () => {
        setSearch(search.trim());
        handleGetDispatchers(1, search.trim());
    };

    return (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-2xl w-full">
                <h2 className="text-lg font-bold mb-4">Selecione um despachante</h2>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div className="relative flex-1">
                        <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar despachante..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button
                        type='button'
                        className="flex items-center space-x-2  bg-primary-600 px-4 py-2 rounded hover:bg-primary-700"
                        onClick={handleSearchClick}
                    >
                        <MagnifyingGlassIcon className="w-5 h-5" />
                        <span>Buscar</span>
                    </button>

                </div>
                <ul className='divide-y divide-gray-100 max-h-60 overflow-y-auto'>
                    {dispatchers.map((d: Dispatcher) => (
                        <li key={d._id} className='flex justify-between gap-x-6 py-5'>
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm/6 font-semibold text-gray-900">{d.name}</p>
                                <p className="mt-1 truncate text-xs/5 text-gray-500">{d.email}</p>
                            </div>
                            <SelectionButton onClick={() => { onSelect(d._id, d.name); onClose(); }} />
                        </li>
                    ))}
                    {dispatchers.length === 0 && (
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