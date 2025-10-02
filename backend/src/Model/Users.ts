export default interface Users {
    id: number;
    name: string;
    email: string;
    password: string;
    perfil_id: number;
    active: boolean;
}

export interface UserWithCargo extends Users {
    nome_cargo: string;
}