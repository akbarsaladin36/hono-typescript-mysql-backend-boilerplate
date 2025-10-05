import { Context, Next } from "hono"
import jwt from "jsonwebtoken"
import { config } from "dotenv"
import jwtOptions from "../config/jwt"
config()

class AuthMiddleware {
    async userAuthentication(c: Context, next: Next) {
        try {
            let authHeader = c.req.header("authorization")

            // Cek header Authorization
            if (!authHeader) {
                return c.json({ message: "Please login to your app first!", data: null }, 401)
            }

            // Pastikan formatnya "Bearer <token>"
            const parts = authHeader.split(" ")
            if (parts.length !== 2 || parts[0] !== "Bearer") {
                return c.json({ message: "Invalid authorization format", data: null }, 400)
            }

            const token = parts[1]

            // Verifikasi token secara sinkron (lebih bersih)
            const decoded = jwt.verify(token as string, jwtOptions.secret as string)

            // Simpan user ke context
            c.set("currentUser", decoded)
            await next()

        } catch(error: any) {
            if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
                return c.json({ message: error.message, data: null }, 400)
            }
            return c.json({ message: "Internal server error", data: null }, 500)
        }
    }    

}

export default new AuthMiddleware()