export default interface Perfil {
    id: number;
    cargos: ICargos;
}

export enum ICargos {
    ADMIN = 'ADMIN',
    OPERADOR_DE_CAMPO = 'OPERADOR_DE_CAMPO'
}