import userRepository from "../repositories/user";

class UserService {
    async FindAllService() {
        try {
            return await userRepository.FindAll()
        } catch(error) {
            throw error
        }
    }
    async FindOneService(username: string) {
        try {
            return await userRepository.FindOne(username)
        } catch(error) {
            throw error
        }
    }
    async CreateService(setData: any) {
        try {
            return await userRepository.Create(setData)
        } catch(error) {
            throw error
        }
    }
    async UpdateService(username: string, setData: any) {
        try {
            return await userRepository.Update(username, setData)
        } catch(error) {
            throw error
        }
    }
    async DeleteService(username: string) {
        try {
            return await userRepository.Delete(username)
        } catch(error) {
            throw error
        }
    }
}

export default new UserService()