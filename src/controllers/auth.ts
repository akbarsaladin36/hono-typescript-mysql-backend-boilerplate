import bcrypt from "bcryptjs"
import authService from "../services/auth"
import { Context } from "hono"
import jwt from "jsonwebtoken"
import jwtOptions from "../config/jwt"

class AuthController {
    async RegisterController(c: Context) {
        try {
            const { username, email, password } = await c.req.json()
            const result = await authService.FindOneService(username)
            if(result) {
                return c.json({ message: `A username ${username} have been registered!`, data: null }, 400)
            } else {
                const saltSync = bcrypt.genSaltSync(10)
                const hashedPassword = bcrypt.hashSync(password, saltSync)
                const setData: any = {
                    username: username,
                    email: email,
                    password: hashedPassword,
                    role: "user",
                    status: "active",
                    created_at: new Date(Date.now()),
                    created_by: username
                }
                await authService.CreateService(setData)
                return c.json({ message: `A new user are succesfully created!`, data: setData }, 200)
            }
        } catch(error: any) {
            return c.json({ message: error.message, data: null }, 500)
        }
    }
    async LoginController(c: Context) {
        try {
            const { username, password } = await c.req.json()
            const result = await authService.FindOneService(username)
            if(result) {
                const checkPassword = bcrypt.compareSync(password, result.password)
                if(checkPassword) {
                    const payload = {
                        username: result.username,
                        email: result.email,
                        role: result.role,
                        status: result.status
                    }
                    const token = jwt.sign(payload, jwtOptions.secret, { expiresIn: jwtOptions.expiresIn })
                    const setData = {
                        ...payload,
                        token
                    }
                    return c.json({ message: "Login sudah berhasil dilakukan!", data: setData }, 200)
                } else {
                    return c.json({ message: `A password are incorrect! Please try again!`, data: null }, 400)
                }
            } else {
                return c.json({ message: `A username ${username} are not found! Please register now!`, data: null }, 404)
            }
        } catch(error: any) {
            return c.json({ message: error.message, data: null }, 500)
        }
    }
}

export default new AuthController()