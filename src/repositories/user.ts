import { ResultSetHeader, RowDataPacket } from "mysql2";
import connection from "../config/database";

class UserRepository {
    async FindAll() {
        try {
            const queryString = "SELECT * FROM users"
            const [rows] = await connection.query<RowDataPacket[]>(queryString)
            return rows
        } catch(error) {
            throw error
        }
    }
    async FindOne(username: string) {
        try {
            const queryString = "SELECT * FROM users WHERE username = ?"
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
             const result: any = await connection.query<ResultSetHeader>(queryString, params)
             return { id: result.insertId, ...setData }
        } catch(error) {
            throw error
        }
    }
    async Update(username: string, setData: any) {
        try {
             const queryString = "UPDATE users SET ? WHERE username = ?"
             const params = [setData, username]
             const result: any = await connection.query<ResultSetHeader>(queryString, params)
             return { ...setData }
        } catch(error) {
            throw error
        }
    }
    async Delete(username: string) {
        try {
            const queryString = "DELETE FROM users WHERE username = ?"
            const params = [username]
            const result: any = await connection.query<ResultSetHeader>(queryString, params)
            return result.affectedRows > 0
        } catch(error) {
            throw error
        }
    }
}

export default new UserRepository()