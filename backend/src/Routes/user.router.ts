import { Router } from "express";
import checkPermission from "../Middleware/auth.middleware";
import UsersController from "../Controller/users.controller";

const router = Router()
const userController = new UsersController()

router.get("/", checkPermission(['ADMIN']), userController.handleUsers)
router.get("/:id", checkPermission(['ADMIN']), userController.handleUserById)
router.post("/search-by-email", checkPermission(['ADMIN']), userController.handleUserByEmail)
router.post("/", checkPermission(['ADMIN']), userController.handleNewUser)
router.patch("/:id", checkPermission(['ADMIN']), userController.handleChangeUser)


export default router;