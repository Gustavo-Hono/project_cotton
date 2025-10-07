import { Router } from "express";
import checkPermission from "../Middleware/auth.middleware";
import StepsController from "../Controller/steps.controller";

const router = Router()
const steps = new StepsController();

router.get('/', checkPermission(['ADMIN']), steps.handleSteps)
router.get('/:id', checkPermission(['ADMIN']), steps.handleStepsByid)
router.post('/', checkPermission(['ADMIN']), steps.handleRegisterStep)
router.patch('/:id', checkPermission(['ADMIN']), steps.handleChangeStep)

export default router