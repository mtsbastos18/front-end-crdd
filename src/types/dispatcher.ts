export interface Address {
    _id?: string;
    street: string;
    number: number;
    complement?: string;
    city: string;
    state: string;
    zipCode: string;
}

export interface PhoneSchema {
    _id?: string;
    type: string;
    number: string;
}

export interface Dispatcher {
    _id: string;
    name: string;
    address: Address[];
    phones: PhoneSchema[];
    email: string;
    cpf: string;
    rg: string;
    matricula: string;
    birthDate: string;
}

export interface DispatcherPayload {
    name: string;
    address: Address;
    phones: PhoneSchema[];
    email: string;
    cpf: string;
    rg: string;
    matricula: string;
    birthDate: string;
}