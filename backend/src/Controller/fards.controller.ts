import FardsService from "../Services/fards.service";
import { RequestWithUser } from "../types";
import { Response, Request } from 'express';

export default class FardsController {
    private fardService: FardsService

    constructor() {
        this.fardService = new FardsService();
    }

    async createFard(req: RequestWithUser, res: Response) {
        try {
            if (!req.usuario) {
                return res.status(401).json({ message: "Usuário não autenticado." });
            }

            const id_user = Number(req.usuario.sub)
            const createFards = await this.fardService.registerFard(id_user)
            
            return res.status(201).json(createFards)
        } catch (error: any) {
            return res.status(400).json({message: error.message})
        }
    }

    async getFardsById(req: RequestWithUser, res: Response) {
        try {
            const id = Number(req.params.id)
            if (Number.isNaN(id)) {
                return res.status(401).json({message: "Id não especificado"})
            }

            const FardById = await this.fardService.fardById(id)
            return res.status(200).json(FardById)
        } catch (error: any) {
            return res.status(400).json({message: error.message})
        }
    }

    async getFards(req: RequestWithUser, res: Response) {
        try {
            const allFards = await this.fardService.getFards();
            return res.status(200).json(allFards);
        } catch (error: any) {
            return res.status(400).json({message: error.message})
        }
    }

    async deleteFard(req: RequestWithUser, res: Response) {
        try {
            if(!Number(req.params.id)) {
                return res.status(400).json({message: "Soft delete está faltando o id"})
            }
            const id = Number(req.params.id)
            const fardDeleted = await this.fardService.deleteFard(id);
            return res.status(200).json(fardDeleted)

        } catch (error: any) {
            return res.status(401).json({message: error.message})
        }
    }
}