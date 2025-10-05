import UsersService from "../Services/user.service";
import { RequestWithUser } from "../types";
import { Response } from "express";

export default class UsersController {
  private userService = new UsersService();

  async handleUsers(req: RequestWithUser, res: Response) {
    try {
      const users = await this.userService.getUsers();
      return res.status(200).json(users);
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao listar usuários" });
    }
  }

  async handleUserById(req: RequestWithUser, res: Response) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: "Id inválido" });
      }

      const user = await this.userService.getUserById(id);
      if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
      return res.status(200).json(user);
    } catch (err: any) {
      if (err.message.includes('Não encontrado')) {
        return res.status(404).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  }

  async handleUserByEmail(req: RequestWithUser, res: Response) {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ message: "Email é obrigatório" });

      const user = await this.userService.getUserByEmail(email);
      if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

      return res.status(200).json(user);
    } catch (err: any) {
      if (err.message.includes('Não encontrado')) {
        return res.status(404).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  }

  async handleNewUser(req: RequestWithUser, res: Response) {
    try {
      const { name, email, password, perfil_id, active } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "Nome, email e senha são obrigatórios" });
      }
      if (!Number.isInteger(perfil_id)) {
        return res.status(400).json({ message: "perfil_id inválido" });
      }
      if (active === undefined) {
        return res.status(400).json({ message: "active é obrigatório (true/false)" });
      }
      const created = await this.userService.registerNewUser(name, email, password, perfil_id, active);
      return res.status(201).json(created);
    } catch (err: any) {
      if (err.message.includes('Não encontrado')) {
        return res.status(404).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  }

  async handleChangeUser(req: RequestWithUser, res: Response) {
    try {
      const id = Number(req.params.id);
      const { password } = req.body;

      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: "Id inválido" });
      }
      if (!password) {
        return res.status(400).json({ message: "Senha nova é obrigatória" });
      }

      const updated = await this.userService.changeUser(id, password);
      if (!updated) return res.status(404).json({ message: "Usuário não encontrado" });

      return res.status(200).json(updated);
    } catch (err: any) {
      if (err.message.includes('Não encontrado')) {
        return res.status(404).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  }
}
