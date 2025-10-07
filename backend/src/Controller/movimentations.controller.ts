import MovimentationsServices from "../Services/movimentation.service";
import { Response } from 'express';
import { RequestWithUser } from "../types";

export default class MovimentationsController {
    private movimentationService: MovimentationsServices;

    constructor() {
        this.movimentationService = new MovimentationsServices();
    }

    public handleCreateMovimentation = async (req: RequestWithUser, res: Response) =>{
        try {
            const {fard_id, step_id} = req.body
            
            if (!req.usuario) {
                return res.status(401).json({ message: "Usuário não autenticado." });
            }
            if(!fard_id || !step_id) {
                return res.status(400).json({message: "id do fardo ou do step faltando"})
            }

            const newMovimentation = await this.movimentationService.registerMovimentation({fard_id:Number(fard_id), step_id:Number(step_id)}, req.usuario)
            return res.status(201).json(newMovimentation)
        } catch (error: any) {
            return res.status(500).json({message: error.message})
        }
    }

    public handleMovimentation = async (req: RequestWithUser, res:Response) => {
        try {
            const movimentations = await this.movimentationService.getMovimentations()
            return res.status(200).json(movimentations)
        } catch (error:any) {
            return res.status(500).json({message: error.message})
        }
    }
    public handleMovimentationById = async (req:RequestWithUser, res:Response) => {
        try {
            const id = Number(req.params.id)
            if(Number.isNaN(id)) {
                return res.status(400).json({message: "Id inválido"})
            }
            const movimentatioId = await this.movimentationService.getMovimentationById(id)
            return res.status(200).json(movimentatioId)
            
        } catch (error:any) {
            return res.status(500).json({message: error.message})
        }
    }

    public handleFardId =async (req:RequestWithUser, res:Response) => {
        try {
            const id = Number(req.params.id)
            if(Number.isNaN(id)) {
                return res.status(400).json({message: "Id inválido"})
            }
            const movimentationByFard = await this.movimentationService.getFardsById(id)
            return res.status(200).json(movimentationByFard)
        } catch (error:any) {
            return res.status(500).json({message: error.message})
        }
    }

}