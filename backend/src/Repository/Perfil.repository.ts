import db from "../db";
import Perfil from "../Model/Perfils";

export default class perfilRepository {
    async getAll(): Promise<Perfil[]> {
        const {rows} = await db.query("SELECT * FROM perfil")
        console.log(rows)
        return rows
    }

    async getById(id:number): Promise<Perfil|null> {
        const {rows} = await db.query("SELECT * FROM movimentations WHERE id=$1")
        console.log(rows)
        return rows
    }

    async createPerfil(cargos: Perfil) {
        const {rows} = db.query("INSERT INTO movimentations(cargos) VALUES ($1, $2, $3, $4)", [cargos])
        console.log(rows)
        return rows
    }
    
    async updatePerfil(id:number, cargos:Perfil) {
        const {rows} = db.query("UPDATE perfil SET cargos=$1 WHERE id=$2", [cargos, id])
        console.log(rows)
        return rows
    }
    
}