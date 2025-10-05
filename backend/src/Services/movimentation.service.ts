import FardsRepository from "../Repository/Fards.repository";
import MovimentationsRepository from "../Repository/Movimentations.repository";
import StepsRepository from "../Repository/Steps.repository";

export default class MovimentationsServices {

    private movimentationRepository: MovimentationsRepository;
    private fardRepository: FardsRepository;
    private stepRepository: StepsRepository;


    constructor() {
        this.movimentationRepository = new MovimentationsRepository();
        this.fardRepository = new FardsRepository();
        this.stepRepository = new StepsRepository();
    }

    async registerMovimentation(dados: { fard_id: number; step_id: number }, usuario: { sub: string }) {
        
        const fardoExist = await this.fardRepository.getById(dados.fard_id);

        if (!fardoExist) {
            throw new Error('Fardo não encontrado.');
        }

        const stepExist = await this.stepRepository.getById(dados.step_id)

        if (!stepExist) {
            throw new Error("ID do Step não encontrado")
        }
        const userId = Number(usuario.sub);

        const newMovimentation = await this.movimentationRepository.createMovimentation(dados.fard_id, userId, dados.step_id) 
        return newMovimentation;
    }

    async getMovimentationById(id:number) {
        const movimentatioById = await this.movimentationRepository.getById(id);
        if (movimentatioById === null) {
            throw new Error("Movimentação nao existe")
        }
        return movimentatioById;
    }

    async getMovimentations() {
        const allMovimentations = await this.movimentationRepository.getAll();
        return allMovimentations;
    }

    async getFardsById(id:number){
        const fardId = await this.movimentationRepository.findByFardoId(id)
        return fardId
    }

}