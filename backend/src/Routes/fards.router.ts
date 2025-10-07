import { Router } from "express";
import checkPermission from "../Middleware/auth.middleware";
import FardsController from "../Controller/fards.controller";

const router = Router()
const fardController = new FardsController();

router.get("/", checkPermission(["ADMIN"]), fardController.getFards)
router.get("/:id", checkPermission(["ADMIN", "OPERADOR_DE_CAMPO"]), fardController.getFardsById)
router.post("/", checkPermission(["ADMIN", "OPERADOR_DE_CAMPO"]), fardController.createFard)
router.delete("/:id", checkPermission(["ADMIN"]), fardController.deleteFard)


export default router;