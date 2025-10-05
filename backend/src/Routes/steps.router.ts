import { Router } from "express";
import checkPermission from "../Middleware/auth.middleware";
import StepsController from "../Controller/steps.controller";

const router = Router()
const steps = new StepsController();

router.get('/steps/', checkPermission(['ADMIN']), steps.handleSteps)
router.get('/steps/:id', checkPermission(['ADMIN']), steps.handleStepsByid)
router.post('/steps/', checkPermission(['ADMIN']), steps.handleRegisterStep)
router.patch('/steps/:id', checkPermission(['ADMIN']), steps.handleChangeStep)

export default router