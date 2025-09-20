// src/services/dispatchersService.ts
import { ApiResponse } from "@/types/apiResponse";
import { Dispatcher, DispatcherPayload } from "@/types/dispatcher";
import apiClient from "@/lib/api";

export async function fetchDispatchers(
    page = 0,
    limit = 10,
    search = ''
): Promise<ApiResponse<Dispatcher[]>> {
    return apiClient<ApiResponse<Dispatcher[]>>(
        `/dispatchers?page=${page}&limit=${limit}&name=${encodeURIComponent(search)}`
    );
}

export async function fetchDispatcherById(id: string): Promise<Dispatcher> {
    return apiClient<Dispatcher>(`/dispatchers/${id}`);
}

export async function createDispatcher(
    dispatcher: Omit<DispatcherPayload, '_id'>
): Promise<ApiResponse<Dispatcher>> {
    return apiClient<ApiResponse<Dispatcher>>('/dispatchers', {
        method: 'POST',
        body: JSON.stringify(dispatcher),
    });
}

export async function updateDispatcher(
    id: string,
    dispatcher: Omit<DispatcherPayload, '_id'>
): Promise<ApiResponse<Dispatcher>> {
    return apiClient<ApiResponse<Dispatcher>>(`/dispatchers/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dispatcher),
    });
}

export async function deleteDispatcher(id: string): Promise<ApiResponse<null>> {
    return apiClient<ApiResponse<null>>(`/dispatchers/${id}`, {
        method: 'DELETE',
    });
}