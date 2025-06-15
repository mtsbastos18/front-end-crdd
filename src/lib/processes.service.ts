import { ApiResponse } from "@/types/apiResponse";
import { Process } from "@/types/process";
import apiClient from "./api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://192.168.18.46:3003/api';

export async function fetchProcesses(page = 0, limit = 10, search = ''): Promise<ApiResponse<Process[]>> {
    return apiClient<ApiResponse<Process[]>>(
        `/processes?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
    );
}