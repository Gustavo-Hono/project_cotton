import { Router } from "express";
import AuthController from "../Controller/auth.controller";

const router = Router()
const authController = new AuthController();

router.post('/login',  authController.handleLogin)
router.post('/register', authController.handleRegister)

export default router