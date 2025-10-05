import { Context } from "hono"
import userService from "../services/user";
import bcrypt from "bcryptjs";

class UserController {
    async FindUsersController(c: Context) {
        try {
            const result = await userService.FindAllService()
            if(result.length > 0) {
                return c.json({ message: null, data: result }, 200)
            } else {
                return c.json({ message: null, data: null }, 404)
            }
        } catch(error: any) {
            return c.json({ message: error.message, data: null }, 500)
        }
    }
    async FindUserController(c: Context) {
        try {
            const username = c.req.param("username")
            const result = await userService.FindOneService(username)
            if(result) {
                return c.json({ message: `A username ${username} data is succesfully appeared!`, data: result }, 200)
            } else {
                return c.json({ message: `A username ${username} data is not found!`, data: null }, 404)
            }
        } catch(error: any) {
            return c.json({ message: error.message, data: null }, 500)
        }
    }
    async CreateUserController(c: Context) {
        try {
            const { username, email, password } = await c.req.json()
            const currentUser = c.get("currentUser")
            const result = await userService.FindOneService(username)
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
                    created_by: currentUser.username
                }
                await userService.CreateService(setData)
                return c.json({ message: `A new user are succesfully created!`, data: setData }, 200)
            }
        } catch(error: any) {
            return c.json({ message: error.message, data: null }, 500)
        }
    }
    async UpdateUserController(c: Context) {
        try {
            const username = c.req.param("username")
            const { fullName, address, phoneNumber } = await c.req.json()
            const currentUser = c.get("currentUser")
            const result = await userService.FindOneService(username)
            if(result) {
                const setData = {
                    full_name: fullName,
                    address: address,
                    phone_number: phoneNumber,
                    updated_at: new Date(Date.now()),
                    updated_by: currentUser.username
                }
                await userService.UpdateService(username, setData)
                return c.json({ message: `A username ${username} data are succesfully updated!`, data: setData }, 200)
            } else {
                return c.json({ message: `A username ${username} are not found! Please register now!`, data: null }, 404)
            }
        } catch(error: any) {
            return c.json({ message: error.message, data: null }, 500)
        }
    }
    async DeleteUserController(c: Context) {
        try {
            const username = c.req.param("username")
            const result = await userService.FindOneService(username)
            if(result) {
                await userService.DeleteService(username)
                return c.json({ message: `A username ${username} data are succesfully deleted!`, data: null }, 200) 
            } else {
                return c.json({ message: `A username ${username} are not found! Please register now!`, data: null }, 404)
            }
        } catch(error: any) {
            return c.json({ message: error.message, data: null }, 500)
        }
    }
}

export default new UserController()