import { Hono } from "hono"
import userController from "../controllers/user"
import authMiddleware from "../middleware/auth"

const router = new Hono()

router.get("/", authMiddleware.userAuthentication, userController.FindUsersController)
router.get("/detail-user/:username", authMiddleware.userAuthentication, userController.FindUserController)
router.post("/", authMiddleware.userAuthentication, userController.CreateUserController)
router.patch("/detail-user/:username", authMiddleware.userAuthentication, userController.UpdateUserController)
router.delete("/detail-user/:username", authMiddleware.userAuthentication, userController.DeleteUserController)

export default router