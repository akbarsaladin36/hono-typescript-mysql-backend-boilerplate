import authRepository from "../repositories/auth";

class AuthService {
    async FindOneService(username: string) {
        try {
            return await authRepository.FindOne(username)
        } catch(error) {
            throw error
        }
    }
    async CreateService(setData: any) {
        try {
            return await authRepository.Create(setData)
        } catch(error) {
            throw error
        }
    }
}

export default new AuthService()