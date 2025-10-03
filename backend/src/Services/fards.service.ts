import FardsRepository from "../Repository/Fards.repository";
import UsersRepository from "../Repository/Users.repository";

export default class FardsService {
    private userRepository: UsersRepository;
    private fardRepository: FardsRepository;

    constructor() {
        this.userRepository = new UsersRepository;
        this.fardRepository = new FardsRepository;
    }

    async registerFard(id_user_create_fard:number) {
        const user_exist = await this.userRepository.getById(id_user_create_fard)
        
        if (!user_exist) {
            throw new Error(" Id inválido do usuário")
        }
        const timestamp = new Date();

        const newFard = await this.fardRepository.createFard(timestamp, id_user_create_fard)
        return newFard;
    }

    

}