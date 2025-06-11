const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://192.168.18.46:3003/api';

interface ApiResponse<T> {
    data: T;
    message?: string;
}

export async function fetchProcesses(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/process`);
    if (!response.ok) {
        throw new Error('Failed to fetch processes');
    }
    return response.json();
}