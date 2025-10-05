import StepsServices from "../Services/steps.service";
import { Response } from 'express';
import { RequestWithUser } from "../types";

export default class StepsController {
    private stepsServices: StepsServices;

    constructor() {
        this.stepsServices = new StepsServices()
    }

    async handleSteps(req: RequestWithUser, res: Response) {
        try {
            const allSteps = await this.stepsServices.allSteps()
            return res.status(200).json(allSteps)
        } catch (error: any) {
            return res.status(500).json({message: error.message})            
        }
    }

    async handleStepsByid(req:RequestWithUser, res:Response) {
        try {
            const id = Number(req.params.id)
            if(Number.isNaN(id)) {
                return res.status(400).json({message: 'Id Inválido'})
            }
            const stepById = await this.stepsServices.getByIdSteps(id) 
            return res.status(200).json(stepById)
        } catch (error:any) {
            return res.status(500).json({message: error.message})
        }
    }

    async handleRegisterStep(req:RequestWithUser, res:Response) {
        try {
            const {name_step} = req.body
            if (!name_step) {
                return res.status(400).json({message: 'nome da etapa nao encontrada'})
            }
            const stepRegister = await this.stepsServices.registerStep(name_step)
            return res.status(200).json(stepRegister)
            
        } catch (error:any) {
            return res.status(500).json({message: error.message})
        }
    }
    async handleChangeStep(req:RequestWithUser, res:Response) {
        try {
            const id = Number(req.params.id)
            if (!id) {
                return res.status(400).json({message: 'Id Inválido'})
            }
            const {name_step} = req.body
            if (!name_step) {
                return res.status(400).json({message: 'Nome Inválido'})
            }

            const updatedStep = await this.stepsServices.changeStep(id, name_step)
            return res.status(200).json(updatedStep)
        } catch (error:any) {
            return res.status(500).json({message: error.message})
        }
    }
}