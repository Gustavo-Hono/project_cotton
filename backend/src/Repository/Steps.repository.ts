import db from "../db"
import Steps, { ISteps } from "../Model/Steps"


export default class StepsRepository{
    async getAll(): Promise<Steps[]> {
        const {rows} = await db.query("SELECT * FROM steps")
        console.log(rows)
        return rows
    }

    async getById(id:number): Promise<Steps|null> {
        const {rows} = await db.query("SELECT * FROM steps WHERE id=$1", [id])
        console.log(rows)
        return rows[0] ?? null
    }

    async createStep(name_step: ISteps){
        const {rows} = await db.query("INSERT INTO steps(name_step) VALUES ($1) RETURNING id, name_step", [name_step])
        console.log(rows[0])
        return rows[0]
    }
    
    async updateStep(id:number, name_step:ISteps) {
        const {rows} = await db.query("UPDATE steps SET name_step=$1 WHERE id=$2 RETURNING id, name_step", [name_step, id])
        console.log(rows[0])
        return rows[0]
    }
}