import { promises } from "dns";
import db from "../db";
import Movimentations from "../Model/Movimentations";

export default class movimentationsRepository{
    async getAll(): Promise<Movimentations[]> {
        const {rows} = await db.query("SELECT * FROM movimentations")
        console.log(rows)
        return rows
    }

    async getById(id:number): Promise<Movimentations|null> {
        const {rows} = await db.query("SELECT * FROM movimentations WHERE id=$1")
        console.log(rows)
        return rows
    }

    async createMovimentation(perfil_id:number, user_id:number, step_id:number,time_movimentation:Date) {
        const {rows} = db.query("INSERT INTO movimentations(perfil_id, user_id, step,id, time_movimentation) VALUES ($1, $2, $3, $4)", [perfil_id, user_id, step_id, time_movimentation])
        console.log(rows)
        return rows
    }

}