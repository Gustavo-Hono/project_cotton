interface Perfil {
    id: number;
    cargos: ICargos;
}

enum ICargos {
    ADMIN = 'ADMIN',
    OPERADOR_DE_CAMPO = 'OPERADOR_DE_CAMPO'
}