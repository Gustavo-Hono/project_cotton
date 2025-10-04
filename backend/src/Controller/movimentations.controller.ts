import MovimentationsServices from "../Services/movimentation.service";
import { Response, Request } from 'express';
import { RequestWithUser } from "../types";

export default class MovimentationsController {
    private movimentationService: MovimentationsServices;

    constructor() {
        this.movimentationService = new MovimentationsServices();
    }

    async handleCreateMovimentation(req: RequestWithUser, res: Response) {
        try {
            const {fard_id, step_id} = req.body
            const user_id = req.usuario?.sub
            if (!req.usuario) {
                return res.status(401).json({ message: "Usuário não autenticado." });
            }
            if(!fard_id || !step_id) {
                return res.status(400).json({message: "id do fardo ou do step faltando"})
            }

            const newMovimentation = await this.movimentationService.registerMovimentation(Number(fard_id), Number(step_id), Number(user_id))
            return res.status(201).json(newMovimentation)
        } catch (error: any) {
            return res.status(400).json({message: error.message})
        }
    }

    async handleMovimentation(req: RequestWithUser, res:Response) {
        try {
            const movimentations = await this.movimentationService.getMovimentations()
            return res.status(200).json(movimentations)
        } catch (error:any) {
            return res.status(401).json({message: error.message})
        }
    }
    async handleMovimentationById(req:RequestWithUser, res:Response) {
        try {
            const id = Number(req.params.id)
            if(!id) {
                return res.status(400).json({message: "Id inválido"})
            }
            const movimentatioId = await this.movimentationService.getMovimentationById(id)
            return res.status(200).json(movimentatioId)
            
        } catch (error:any) {
            return res.status(400).json({message: error.message})
        }
    }

}