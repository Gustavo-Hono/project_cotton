import { Router } from "express";
import checkPermission from "../Middleware/auth.middleware";
import PerfilController from "../Controller/perfil.controller";

const router = Router()
const perfil = new PerfilController();

router.get('/perfils/', checkPermission(['ADMIN']), perfil.handleGetAllPerfils)
router.get('/perfils/:id', checkPermission(['ADMIN']), perfil.handleGetPerfilById)
router.post('/perfils/', checkPermission(['ADMIN']), perfil.handleCreatePerfil)
router.patch('/perfils/:id', checkPermission(['ADMIN']), perfil.handleUpdatePerfil)

export default router