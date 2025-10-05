import { Router } from "express";
import checkPermission from "../Middleware/auth.middleware";
import FardsController from "../Controller/fards.controller";

const router = Router()
const fardController = new FardsController();

router.get("/fards", checkPermission(["ADMIN"]), fardController.getFards)
router.get("/fards/:id", checkPermission(["ADMIN", "OPERADOR_DE_CAMPO"]), fardController.getFardsById)
router.post("/fards", checkPermission(["ADMIN", "OPERADOR_DE_CAMPO"]), fardController.createFard)
router.delete("/fards/:id", checkPermission(["ADMIN"]), fardController.deleteFard)


export default router;