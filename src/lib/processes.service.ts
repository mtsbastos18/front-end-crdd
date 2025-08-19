import { ApiResponse } from "@/types/apiResponse";
import { Process, ProcessCommentFormData, ProcessStatus } from "@/types/process";
import apiClient from "./api";
import { ProcessValidationSchema } from "@/validators/processValidation";

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

export async function addComment(id: string, comment: ProcessCommentFormData): Promise<ApiResponse<Process>> {
    return apiClient<ApiResponse<Process>>(`/processes/${id}/comment`, {
        method: 'PUT',
        body: JSON.stringify(comment),
    });
}

export async function deleteComment(processId: string, commentId: string): Promise<ApiResponse<Process>> {
    return apiClient<ApiResponse<Process>>(`/processes/${processId}/comment/${commentId}`, {
        method: 'DELETE',
    });
}

export async function getStatusList(): Promise<ProcessStatus[]> {
    return apiClient<ProcessStatus[]>('/process-status');
}