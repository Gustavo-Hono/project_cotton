import db from "../db";
import Fards from "../Model/Fards";

export default class FardsRepository {
    async getAll(): Promise<Fards[]> {
        const {rows} = await db.query("SELECT * FROM fards WHERE active = true")
        console.log(rows)
        return rows
    }

    async getById(id: number): Promise< Fards | null> {
        const {rows} = await db.query("SELECT fards.*, user.name FROM fards JOIN users ON fards.id_user_create_fard = user.id WHERE fards.id=$1 AND active=true", [id])
        console.log(rows[0])
        return rows[0]
    }

    async createFard(created_at: Date, id_user_create_fard: number) {
        const {rows} = await db.query("INSERT INTO fards(created_at, id_user_create_fard) VALUES($1, $2) RETURNING created_at, id_user_create_fard", [created_at, id_user_create_fard])
        console.log(rows)
        return rows[0]
    }

    async softDeleteFard(id:number): Promise<Fards| null> {
        const {rows} = await db.query("UPDATE fards SET active = false WHERE id = $1 RETURNING id, created_at, id_user_create_fard, active", [id])
        console.log(rows)
        return rows[0]
    }   
}