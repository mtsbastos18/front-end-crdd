import { Dispatcher } from "./dispatcher";

export interface ProcessComment {
    user: ProcessCommentUser;
    text: string;
    createdAt: string;
    _id: string;
}

export interface ProcessCommentFormData {
    text: string;
}

export interface ProcessHistory {
    status: 'open' | 'in progress' | 'closed';
    updatedAt: Date;
    user: string;
}

export interface Process {
    title: string;
    description: string;
    status: ProcessStatus;
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

export interface ProcessStatus {
    name: string;
    description: string;
    isActive: boolean;
    _id?: string;
}

interface ProcessCommentUser {
    _id: string;
    name: string;
    email: string;
}

