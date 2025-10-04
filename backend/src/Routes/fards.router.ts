import { Router } from "express";
import checkPermission from "../Middleware/auth.middleware";
import FardsController from "../Controller/fards.controller";

const router = Router()
const fardController = new FardsController();

router.get("/fard/:id", checkPermission(["ADMIN"]), fardController.getFardsById                  )
router.get("/fard/", checkPermission(["ADMIN"]), fardController.getFards)
router.post("/fard/", checkPermission(["ADMIN", "OPERADOR_DE_CAMPO"]), fardController.createFard)
router.patch("/fard/", checkPermission(["ADMIN"]), fardController.deleteFard)


export default router;