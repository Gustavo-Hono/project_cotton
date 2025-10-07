import PerfilRepository from "../Repository/Perfil.repository";
import PerfilServices from "../Services/perfil.services";
import { RequestWithUser } from "../types";
import { Response, Request } from 'express';

export default class PerfilController {
    private perfilsServices: PerfilServices;


    constructor() {
        this.perfilsServices = new PerfilServices()
    }

    public handleCreatePerfil = async (req:RequestWithUser, res:Response)=> {
        try {
            const {nome_cargo} = req.body

            if (!nome_cargo) {
                return res.status(400).json({message: "Cargo é obrigatório"})
            }
            const perfil = await this.perfilsServices.registerPerfil(nome_cargo)
            return res.status(200).json(perfil)
        } catch (error:any) {
            return res.status(400).json({message: error.message})
        }
    }

    public handleGetAllPerfils = async (req:RequestWithUser, res:Response) => {
        try {
            const perfils = await this.perfilsServices.getPerfils()
            return res.status(200).json(perfils)
        } catch (error: any) {
            return res.status(400).json({message: error.message})
        }
    }

    public handleGetPerfilById = async (req:Request, res:Response) => {
        try {
            const id = Number(req.params.id)
            if (Number.isNaN(id)) {
                return res.status(400).json({message:"Id inválido"})
            }
            const perfilId = await this.perfilsServices.perfilById(id)
            return res.status(200).json(perfilId)
        } catch (error:any) {
            return res.status(400).json({message:error.message})
        }
    }

    public handleUpdatePerfil = async (req:RequestWithUser, res:Response) => {
        try {
            const {nome_cargo} = req.body
            const id = Number(req.params.id)
            if(Number.isNaN(id)) {
                return res.status(400).json({message: "Precisa de um id"})
            }
            if (!nome_cargo) {
                return res.status(400).json({message: "Cargo é obrigatório"})
            }
            const perfil = await this.perfilsServices.changePerfil(id, nome_cargo)
            return res.status(200).json(perfil)
        } catch (error:any) {
            return res.status(400).json({message: error.message})
        }
    }
}