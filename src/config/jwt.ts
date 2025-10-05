import { config } from "dotenv"
config()

const secret: any = process.env.JWT_SECRET_KEY
const expiresIn: any = process.env.JWT_EXPIRED_TIME

const jwtOptions = {
    secret: secret,
    expiresIn: expiresIn
}

export default jwtOptions