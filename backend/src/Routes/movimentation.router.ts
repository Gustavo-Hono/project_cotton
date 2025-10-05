import { Router } from "express";
import MovimentationsController from "../Controller/movimentations.controller";
import checkPermission from "../Middleware/auth.middleware";
import FardsController from "../Controller/fards.controller";

const router = Router()
const movimentation = new MovimentationsController();
const fard = new FardsController();

router.get('/movimentations/', checkPermission(['ADMIN']), movimentation.handleMovimentation)
router.get('/movimentations/:id', checkPermission(['ADMIN', 'OPERADOR_DE_CAMPO']), movimentation.handleMovimentationById)
router.get('/fardos/:id/movimentacoes', checkPermission(['ADMIN', 'OPERADOR_DE_CAMPO']), fard.getFardsById)
router.post('/movimentations/', checkPermission(['ADMIN', 'OPERADOR_DE_CAMPO']), movimentation.handleCreateMovimentation)

export default router