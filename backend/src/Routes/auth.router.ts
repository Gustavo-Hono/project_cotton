import { Router } from "express";
import AuthController from "../Controller/auth.controller";

const router = Router()
const authController = new AuthController();

router.post('/auth/login',  authController.handleLogin)
router.post('/auth/register', authController.handleRegister)

export default router