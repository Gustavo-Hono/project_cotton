import { ICargos } from "../Model/Perfils";
import PerfilRepository from "../Repository/Perfil.repository";

export default class PerfilServices {
    private perfilRepository: PerfilRepository

    constructor() {
        this.perfilRepository = new PerfilRepository();
    }

    async registerPerfil(cargo: ICargos){
        const cargosValidos = Object.values(ICargos);
        if (!cargosValidos.includes(cargo as ICargos)) {
            throw new Error(`O cargo "${cargo}" é inválido. Os valores aceitos são: ${cargosValidos.join(', ')}.`);
        }
        const newPerfil = await this.perfilRepository.createPerfil(cargo)
        return newPerfil
    }

    async getPerfils() {
        const allPerfils = await this.perfilRepository.getAll();
        return allPerfils
    }

    async perfilById(id:number) {
        const perfilId = await this.perfilRepository.getById(id)
        if(perfilId === null) {
            throw new Error("Perfil com esse id não encontrado")
        }
        return perfilId
    }

    async changePerfil(id:number, cargo:ICargos) {
        const cargosValidos = Object.values(ICargos)
        if (!cargosValidos.includes(cargo as ICargos)) {
            throw new Error("Cargo inválido para se atualizar")
        }
        const perfilChanged = await this.perfilRepository.updatePerfil(id, cargo)
        return perfilChanged;
    }   
}