import { Request, Response } from 'express';
import AuthService from '../Services/auth.service';
import UsersService from '../Services/user.service';

export default class AuthController {
    private authService: AuthService;
    private usersService: UsersService;

    constructor() {
        this.authService = new AuthService();
        this.usersService = new UsersService();
    }

    public handleLogin = async (req: Request, res: Response) => {
        try {
            console.log("1. Requisição chegou no AuthController");
            const { email, password } = req.body;

            if (!email || !password) {
                console.log("Passando pela verificacao 1")
                return res.status(400).json({ message: "Email e senha são obrigatórios." });
            }

            const result = await this.authService.login(email, password);

            if (typeof result === 'string') {
                console.log("Passando pela verificacao 2")
                return res.status(401).json({ message: result });
            }
            return res.status(200).json(result);

        } catch (error: any) {
            console.error("ERRO FATAL CAPTURADO:", error); 
            return res.status(500).json({ message: "Erro interno no servidor." });
        }
    }

    public handleRegister = async (req: Request, res: Response) => {
        try {
            const { name, email, password, perfil_id } = req.body;

            if (!name || !email || !password || !perfil_id) {
                return res.status(400).json({ message: "Nome, email, senha e perfil_id são obrigatórios." });
            }

            const active = true;

            const newUser = await this.usersService.registerNewUser(name, email, password, perfil_id, active);

            return res.status(201).json(newUser);

        } catch (error: any) {
            if (error.message.includes('Email já em uso')) {
                return res.status(409).json({ message: error.message });
            }
            if (error.message.includes('perfil nao encontrado')) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno ao registrar usuário." });
        }
    }
}