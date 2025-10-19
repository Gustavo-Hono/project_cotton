import db from "../db"
import Users, {UserWithCargo} from "../Model/Users"


export default class UsersRepository{
    async getAll(): Promise<Users[]> {
        const {rows} = await db.query("SELECT users.id, users.name, users.email, users.perfil_id, active, perfil.cargos AS nome_cargo FROM users JOIN perfil ON users.perfil_id = perfil.id WHERE users.active = true")
        console.log(rows)
        return rows
    }

    async getById(id:number): Promise<Users|null> {
        const {rows} = await db.query("SELECT * FROM users WHERE id=$1", [id])
        console.log(rows)
        return rows[0]
    }

    async getByEmail(email:string): Promise<UserWithCargo|null> {
        const {rows} = await db.query("SELECT users.id, users.name, users.password, users.email, users.perfil_id, users.active, perfil.cargos AS nome_cargo FROM users JOIN perfil ON users.perfil_id = perfil.id WHERE users.email = $1;", [email])
        console.log(rows)
        return rows[0] ?? null
    }

    async createUser({name, email, password, perfil_id, active}: Omit<Users, "id">){
        const {rows} = await db.query("INSERT INTO users(name, email, password, perfil_id, active) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, perfil_id, active", [name, email, password, perfil_id, active])
        console.log(rows[0])
        return rows[0]
    }
    
    async updateUser(id:number, password:string) {
        const {rows} = await db.query("UPDATE users SET password=$1 WHERE id=$2 RETURNING id, email", [password, id])
        console.log(rows[0])
        return rows[0]
    }
}