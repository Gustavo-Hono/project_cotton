import db from "../db";
import Movimentations from "../Model/Movimentations";

export default class MovimentationsRepository{
    async getAll(): Promise<Movimentations[]> {
        const {rows} = await db.query("SELECT * FROM movimentations")
        console.log(rows)
        return rows
    }

    async getById(id:number): Promise<Movimentations|null> {
        const {rows} = await db.query("SELECT * FROM movimentations WHERE id=$1", [id])
        console.log(rows)
        return rows[0]
    }

    async createMovimentation(fard_id:number, user_id:number, step_id:number,time_movimentation:Date) {
        const {rows} = await db.query("INSERT INTO movimentations(fard_id, user_id, step_id, time_movimentation) VALUES ($1, $2, $3, $4) RETURNING id, user_id, step_id, time_movimentation", [fard_id, user_id, step_id, time_movimentation])
        console.log(rows)
        return rows
    }

}