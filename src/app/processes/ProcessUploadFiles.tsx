'use client'

import { uploadFiles } from '@/lib/processes.service';
import { DocumentArrowDownIcon, DocumentIcon, PlusIcon } from '@heroicons/react/24/outline';
import React, { useState, DragEvent, ChangeEvent } from 'react';
import { useProcesses } from './useProcesses';
import { toast } from 'react-toastify';
export default function ProcessUploadFiles({ processId, processFiles }: { processId: string, processFiles?: any[] }) {
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { handleUploadFiles } = useProcesses();
    console.log('processFiles', processFiles)

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles(prevFiles => [...prevFiles, ...newFiles]);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) {
            const newFiles = Array.from(e.dataTransfer.files);
            setFiles(prevFiles => [...prevFiles, ...newFiles]);
        }
    };

    const removeFile = (fileIndex: number) => {
        setFiles(prevFiles => prevFiles.filter((_, index) => index !== fileIndex));
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            alert('Por favor, selecione ao menos um arquivo.');
            return;
        }

        // const formData = new FormData();
        // files.forEach(file => {
        //     formData.append('files', file);
        // });
        // formData.append('processId', processId);

        const response = await handleUploadFiles(processId, files);

        console.log('Enviando arquivos para o processo:', processId);
        // Lógica de upload para sua API...

        // Após o upload (sucesso ou falha), feche o modal e limpe os arquivos
        if (response) {
            toast.success('Arquivos enviados com sucesso!');
        }
        setFiles([]);
        setIsModalOpen(false);
    };

    const renderModal = () => {
        if (!isModalOpen) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
                    <h2 className="text-xl font-bold mb-4">Carregar Documentos</h2>
                    <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
                        onClick={() => document.getElementById('fileInputModal')?.click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            id="fileInputModal"
                            multiple
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <p className="text-gray-500">
                            Arraste e solte os arquivos aqui, ou clique para selecionar.
                        </p>
                    </div>

                    {files.length > 0 && (
                        <div className="mt-4">
                            <h3 className="font-semibold text-lg mb-2">Arquivos Selecionados:</h3>
                            <ul className="space-y-2 max-h-48 overflow-y-auto">
                                {files.map((file, index) => (
                                    <li key={index} className="flex justify-between items-center p-2 border rounded-md bg-gray-50">
                                        <span className="text-sm text-gray-700 truncate pr-2">{file.name} - {(file.size / 1024).toFixed(2)} KB</span>
                                        <button
                                            onClick={() => removeFile(index)}
                                            className="text-red-500 hover:text-red-700 font-semibold text-sm flex-shrink-0"
                                        >
                                            Remover
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            onClick={() => { setIsModalOpen(false); setFiles([]); }}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleUpload}
                            disabled={files.length === 0}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
                        >
                            Enviar Arquivos
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-lg shadow p-6 card-principal">
            <div className="flex items-center">
                <DocumentIcon className="h-6 w-6 text-gray-600 mr-2" />
                <h2 className="text-lg font-medium">Documentos</h2>
            </div>
            <div className='flex justify-end'>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 flex items-center"
                >
                    <PlusIcon className="w-4 h-4 mr-1" />

                    Carregar Documentos
                </button>
            </div>
            <div className='files-list mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {processFiles && processFiles.length > 0 ? (
                    processFiles.map((file, index) => (
                        <a
                            key={index}
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-3 border rounded-lg bg-gray-50 shadow-sm overflow-hidden hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            <DocumentIcon className="h-6 w-6 text-gray-500 mr-3 flex-shrink-0" />
                            <span className="text-sm text-gray-800 truncate" title={file.originalname}>
                                {file.originalname}
                            </span>
                        </a>
                    ))
                ) : (
                    <p className="text-sm text-gray-500 col-span-full mt-2">Nenhum documento carregado para este processo.</p>
                )}
            </div>




            {renderModal()}
        </div>
    );
}