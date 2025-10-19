import db from "../db";
import Fards from "../Model/Fards";

export default class FardsRepository {
    async getAll(): Promise<Fards[]> {
        const {rows} = await db.query("SELECT * FROM fards ORDER BY id ASC")
        console.log(rows)
        return rows
    }

    async getById(id: number): Promise< Fards | null> {
        const {rows} = await db.query("SELECT fards.*, users.name FROM fards JOIN users ON fards.id_user_create_fard = users.id WHERE fards.id=$1 AND fards.active=true", [id])
        console.log(rows[0])
        return rows[0]
    }

    async createFard(id_user_create_fard: number) {
        const {rows} = await db.query("INSERT INTO fards(id_user_create_fard) VALUES($1) RETURNING id,created_at, id_user_create_fard", [id_user_create_fard])
        console.log(rows)
        return rows[0]
    }

    async softDeleteFard(id:number): Promise<Fards| null> {
        const {rows} = await db.query("UPDATE fards SET active = false WHERE id = $1 RETURNING id, created_at, id_user_create_fard, active", [id])
        console.log(rows)
        return rows[0]
    }   


}