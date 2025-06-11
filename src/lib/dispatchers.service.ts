import { Dispatcher } from "@/types/dispatcher";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3003/api';

interface ApiResponse<T> {
    data: T;
    message?: string;
}

export async function fetchDispatchers(): Promise<Dispatcher[]> {
    const response = await fetch(`${API_BASE_URL}/dispatchers`);
    if (!response.ok) {
        throw new Error('Failed to fetch dispatchers');
    }
    return response.json();
}

export async function fetchDispatcherById(id: string): Promise<Dispatcher> {
    const response = await fetch(`${API_BASE_URL}/dispatchers/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch dispatcher');
    }
    return response.json();
}

export async function createDispatcher(dispatcher: Omit<Dispatcher, '_id'>): Promise<ApiResponse<Dispatcher>> {
    const response = await fetch(`${API_BASE_URL}/dispatchers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dispatcher),
    });
    if (!response.ok) {
        throw new Error('Failed to create dispatcher');
    }
    return response.json();
}

export async function updateDispatcher(id: string, dispatcher: Omit<Dispatcher, '_id'>): Promise<ApiResponse<Dispatcher>> {
    const response = await fetch(`${API_BASE_URL}/dispatchers/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dispatcher),
    });
    if (!response.ok) {
        throw new Error('Failed to update dispatcher');
    }
    return response.json();
}

export async function deleteDispatcher(id: string): Promise<ApiResponse<null>> {
    const response = await fetch(`${API_BASE_URL}/dispatchers/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete dispatcher');
    }
    return response.json();
}