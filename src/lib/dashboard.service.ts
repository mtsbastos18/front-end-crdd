import { ApiResponse } from "@/types/apiResponse";
import apiClient from "./api";

export async function fetchDashboardData(): Promise<ApiResponse<{ dispatcherCount: number; processCount: number }>> {
    return apiClient<ApiResponse<{ dispatcherCount: number; processCount: number }>>('/dashboard');
}