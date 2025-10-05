import { Hono } from "hono"
import authController from "../controllers/auth"

const router = new Hono()

router.post("/register", authController.RegisterController)
router.post("/login", authController.LoginController)

export default router