import db from "../db";
import Fards from "../Model/Fards";

export default class fardsRepository {
    async getAll(): Promise<Fards[]> {
        const {rows} = await db.query("SELECT * FROM fards")
        console.log(rows)
        return rows
    }

    async getById(id: number): Promise< Fards | null> {
        const {rows} = await db.query("SELECT * FROM fards WHERE id=$1", [id])
        console.log(rows)
        return rows
    }

    async createFard(created_at: Date, id_user_create_fard: number) {
        const {rows} = await db.query("INSERT INTO fards(created_at, id_user_create_fard) VALUES($1, $2)", [created_at, id_user_create_fard])
        console.log(rows)
        return rows[0]
    }
}