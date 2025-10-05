import Fards from "../Model/Fards";
import FardsRepository from "../Repository/Fards.repository";
import UsersRepository from "../Repository/Users.repository";
import gerarQrCode from "../utils/geradorQr";

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

        const newFard = await this.fardRepository.createFard(id_user_create_fard)
        const qrCode = await gerarQrCode(newFard.id);
        return {fard: newFard, qrCode: qrCode};
    } 

    async getFards() {
        const fards = await this.fardRepository.getAll();
        return fards
    }

    async fardById(id:number)  {
        const fardId = await this.fardRepository.getById(id)
        if (fardId === null) {
            throw new Error("Sem nenhum fardo")
        }
        return fardId
    }

    async deleteFard(id:number) {
        const softDelete = await this.fardRepository.softDeleteFard(id);
        if (softDelete === null) {
            throw new Error("Sem nenhum fardo para deletar")
        }
        return softDelete
    }

}