import Users from "../Model/Users";
import bcrypt from "bcrypt";
import UsersRepository from "../Repository/Users.repository";

const salt = 10;
const repo = new UsersRepository();



export async function hashPassword(input: Users) {
    
    try {
        const password_hash = await bcrypt.hash(input.password, salt)
        const user = await repo.createUser({
            name: input.name,
            email: input.email,
            password: password_hash,
            perfil_id: Number(input.perfil_id),
            active: input.active,
        })
        return user;
    } catch (error) {
        console.log("Error no hashing")
    }
}

export async function updatePassword(userId:number, password:string) {
    try {
        const new_password = await bcrypt.hash(password, salt)
        const updatedPassword = await repo.updateUser(userId, new_password)
        return updatedPassword;
    } catch (error) {
        
    }
    
}