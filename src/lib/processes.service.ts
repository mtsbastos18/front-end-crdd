import { ApiResponse } from "@/types/apiResponse";
import { Process, ProcessComment } from "@/types/process";
import apiClient from "./api";
import { ProcessValidationSchema } from "@/validators/processValidation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://192.168.18.46:3003/api';

export async function fetchProcesses(page = 0, limit = 10, search = ''): Promise<ApiResponse<Process[]>> {
    return apiClient<ApiResponse<Process[]>>(
        `/processes?page=${page}&limit=${limit}&title=${encodeURIComponent(search)}`
    );
}

export async function createProcess(process: Omit<ProcessValidationSchema, '_id'>): Promise<ApiResponse<Process>> {
    return apiClient<ApiResponse<Process>>('/processes', {
        method: 'POST',
        body: JSON.stringify(process),
    });
}

export async function updateProcess(id: string, process: Omit<ProcessValidationSchema, '_id'>): Promise<ApiResponse<Process>> {
    return apiClient<ApiResponse<Process>>(`/processes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(process),
    });
}

export async function getProcessById(id: string): Promise<Process> {
    return apiClient<Process>(`/processes/${id}`);
}

export async function addComment(id: string, comment: ProcessComment): Promise<ApiResponse<Process>> {
    return apiClient<ApiResponse<Process>>(`/processes/${id}/comment`, {
        method: 'PUT',
        body: JSON.stringify(comment),
    });
}