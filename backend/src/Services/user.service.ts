import PerfilRepository from "../Repository/Perfil.repository";
import UsersRepository from "../Repository/Users.repository";
import bcrypt from "bcrypt";
const salt = Number(process.env.SALT_ROUNDS);

export default class UsersService{
    private userRepository: UsersRepository;
    private perfilRepository: PerfilRepository;
    
    constructor() {
        this.perfilRepository = new PerfilRepository();
        this.userRepository = new UsersRepository();
    }

    async getUsers() {
        const allUsers = await this.userRepository.getAll();
        return allUsers
    }

    async getUserById(id: number) {
        const userId = await this.userRepository.getById(id);
        if (userId === null) throw new Error('Não encontrado pelo id')
        return userId;
    }

    async getUserByEmail(email: string) {
        const userEmail = await this.userRepository.getByEmail(email)
        if (userEmail === null) {
            throw new Error('Email não encontrado')
        }
        return userEmail;
    }
    
    async registerNewUser(name:string, email:string, password:string, perfil_id:number) {
        const checkPerfilId = await this.perfilRepository.getById(perfil_id)
        if (!checkPerfilId) {
            throw new Error('id do perfil nao encontrado para a criação do usuario')
        }

        const checkEmail = await this.userRepository.getByEmail(email);
        if (checkEmail) {
            throw new Error('Email já em uso')
        }
        const password_hash = await bcrypt.hash(password, salt);

        const newUser = await this.userRepository.createUser({
            name:name,
            email:email,
            password:password_hash,
            perfil_id:perfil_id,
            active:true
        })
        return newUser;

    }

    async changeUser(id:number, password:string){
        const userById = await this.userRepository.getById(id);
        if (userById === null) {
            throw new Error ('Não encontrado o usuario pelo id para efetuar a alteração')
        }
        const password_hash = await bcrypt.hash(password, salt);
        const attUser = await this.userRepository.updateUser(id, password_hash);
        return attUser;
    }

}