import db from "../db";
import Perfil, { ICargos } from "../Model/Perfils";

export default class PerfilRepository {
    async getAll(): Promise<Perfil[]> {
        const {rows} = await db.query("SELECT * FROM perfil")
        console.log(rows)
        return rows
    }

    async getById(id:number): Promise<Perfil|null> {
        const {rows} = await db.query("SELECT * FROM perfil WHERE id=$1", [id])
        console.log(rows)
        return rows[0] ?? null
    }

    async createPerfil(cargos: ICargos){
        const {rows} = await db.query("INSERT INTO perfil(cargos) VALUES ($1) RETURNING id, cargos", [cargos])
        console.log(rows[0])
        return rows[0]
    }
    
    async updatePerfil(id:number, cargos:ICargos) {
        const {rows} = await db.query("UPDATE perfil SET cargos=$1 WHERE id=$2 RETURNING id, cargos", [cargos, id])
        console.log(rows[0])
        return rows[0]
    }
    
}