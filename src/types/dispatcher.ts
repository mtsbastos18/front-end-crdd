export interface Address {
    _id: string;
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
}

export interface PhoneSchema {
    _id: string;
    type: string;
    number: string;
}

export interface Dispatcher {
    _id: string;
    name: string;
    address: Address[];
    phoneSchema: PhoneSchema[];
    email: string;
    cpf: string;
    rg: string;
    matricula: string;
    birthDate: string;
}