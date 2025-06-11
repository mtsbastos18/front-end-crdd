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
    createdAt: Date;
    updatedAt: Date;
    term: string;
    dispatcher: string; // ObjectId como string
    files: string[];
    comments: ProcessComment[];
    history: ProcessHistory[];
    _id: string; // ObjectId como string
}