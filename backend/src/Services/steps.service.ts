import { ISteps } from "../Model/Steps";
import StepsRepository from "../Repository/Steps.repository";

export default class StepsServices{
    private stepsRepository: StepsRepository;

    constructor(){
        this.stepsRepository = new StepsRepository();
    }

    async allSteps() {
        const steps = await this.stepsRepository.getAll()
        return steps
    }

    async getByIdSteps(id:number) {
        const stepById = await this.stepsRepository.getById(id)
        if (stepById === null){
            throw new Error('Não encontrado por esse id')
        }
        return stepById
    }

    async registerStep(name_step: ISteps) {
        const stepsValids = Object.values(ISteps);
        if (!stepsValids.includes(name_step as ISteps)) {
            throw new Error(`O Step "${name_step}" é inválido. Os valores aceitos são: ${stepsValids.join(', ')}.`);
        }
        const newStep = await this.stepsRepository.createStep(name_step)
        return newStep;
    }

    async changeStep(id:number, name_step:ISteps) {
        const stepsValids = Object.values(ISteps);
        if (!stepsValids.includes(name_step as ISteps)) {
            throw new Error(`O Step "${name_step}" é inválido. Os valores aceitos são: ${stepsValids.join(', ')}.`);
        }
        const atualizedStep = await this.stepsRepository.updateStep(id, name_step)
        return atualizedStep;
    }
}