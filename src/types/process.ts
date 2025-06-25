import { Dispatcher } from "./dispatcher";

export interface ProcessComment {
    user: string;
    text: string;
    createdAt: Date;
}

export interface ProcessHistory {
    status: 'open' | 'in progress' | 'closed';
    updatedAt: Date;
    user: string;
}

export interface Process {
    title: string;
    description: string;
    status: 'open' | 'in progress' | 'closed';
    priority: 'low' | 'medium' | 'high';
    createdAt?: Date;
    updatedAt?: Date;
    term: string;
    dispatcher: Dispatcher | null; // ObjectId como string
    dispatcherName?: string;
    files?: string[];
    comments?: ProcessComment[];
    history?: ProcessHistory[];
    _id?: string; // ObjectId como string
}