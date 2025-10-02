import { error } from "console";
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

    async registerMovimentation(fard_id:number, step_id:number, user_id:number) {
        
        const fardoExist = await this.fardRepository.getById(fard_id);

        if (!fardoExist) {
            throw new Error('Fardo não encontrado.');
        }

        const stepExist = await this.stepRepository.getById(step_id)

        if (!stepExist) {
            throw new Error("ID do Step não encontrado")
        }

        const timestamp = new Date();

        const newMovimentation = await this.movimentationRepository.createMovimentation(fard_id, user_id, step_id, timestamp) 
        return newMovimentation;
    }

}