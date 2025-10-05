import { Router } from "express";
import checkPermission from "../Middleware/auth.middleware";
import UsersController from "../Controller/users.controller";

const router = Router()
const userController = new UsersController()

router.get("/users/", checkPermission(['ADMIN']), userController.handleUsers)
router.get("/users/:id", checkPermission(['ADMIN']), userController.handleUserById)
router.post("/users/search-by-email", checkPermission(['ADMIN']), userController.handleUserByEmail)
router.post("/users/", checkPermission(['ADMIN']), userController.handleNewUser)
router.patch("/users/:id", checkPermission(['ADMIN']), userController.handleChangeUser)


export default router;