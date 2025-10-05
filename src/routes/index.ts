import { Hono } from "hono"
import authRoute from "./auth"
import userRoute from "./user"

const routes = new Hono()

routes.route("/auth", authRoute)
routes.route("/users", userRoute)

export default routes