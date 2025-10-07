import { Router } from "express";
import checkPermission from "../Middleware/auth.middleware";
import PerfilController from "../Controller/perfil.controller";

const router = Router()
const perfil = new PerfilController();

router.get('/', checkPermission(['ADMIN']), perfil.handleGetAllPerfils)
router.get('/:id', checkPermission(['ADMIN']), perfil.handleGetPerfilById)
router.post('/', checkPermission(['ADMIN']), perfil.handleCreatePerfil)
router.patch('/:id', checkPermission(['ADMIN']), perfil.handleUpdatePerfil)

export default router