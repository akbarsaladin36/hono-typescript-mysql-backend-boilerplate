import { ResultSetHeader, RowDataPacket } from "mysql2";
import connection from "../config/database";

class AuthRepository {
    async FindOne(username: string) {
        try {
            const queryString = "SELECT username,email,password,role,status FROM users WHERE username = ?"
            const params = [username]
            const [rows]: any = await connection.query<RowDataPacket[]>(queryString, params)
            return rows.length > 0 ? rows[0] : null
        } catch(error) {
            throw error
        }
    }
    async Create(setData: any) {
        try {
            const queryString = "INSERT INTO users SET ?"
            const params = [setData]
            const [rows]: any = await connection.query<ResultSetHeader>(queryString, params)
            return { id: rows.insertId, ...setData }
        } catch(error) {
            throw error
        }
    }
}

export default new AuthRepository()