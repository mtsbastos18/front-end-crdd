import React from 'react';
import { useDispatchers } from './useDispatchers';

export function DispatcherModal({ onSelect, onClose }: any) {
    const {
        dispatchers,
        handleGetDispatchers
    } = useDispatchers();

    const [search, setSearch] = React.useState('');

    // Carregar despachantes ao montar o componente
    React.useEffect(() => {
        handleGetDispatchers();
    }, []);

    // Filtrar despachantes pelo nome ou email
    const filteredDispatchers = dispatchers.filter((d: any) =>
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
                    {filteredDispatchers.map((d: any) => (
                        <li key={d._id} className='flex justify-between gap-x-6 py-5'>
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm/6 font-semibold text-gray-900">{d.name}</p>
                                <p className="mt-1 truncate text-xs/5 text-gray-500">{d.email}</p>
                            </div>
                            <button
                                className="group cursor-pointer relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-neutral-950 font-medium text-neutral-200 transition-all duration-300 hover:w-32"
                                onClick={() => onSelect(d._id, d.name)}
                            >
                                <div className="inline-flex whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-x-3 group-hover:opacity-100">Selecionar</div>
                                <div className="absolute right-3.5">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                </div>
                            </button>
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