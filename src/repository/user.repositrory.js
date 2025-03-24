import persistence from "../daos/persistence.js";
import UserReqDto from "../dtos/user.req.dto.js";
import UserResDto from "../dtos/user.res.dto.js";

const { userDao } = persistence;

class UserRepository {
    constructor() {
        this.dao = userDao
    };

    create = async(user) => {
        try {
            const usersDao = new UserReqDto(user);
            return await this.dao.create(usersDao);
        } catch(error) {
            throw new Error(error);            
        };
    };

    getById = async(id) => {
        try {
            const response = await this.dao.getById(id);
            return new UserResDto(response);
        } catch(error) {
            throw new Error(error);            
        };
    };

    getByEmail = async(email) => {
        try {
            const user = await this.dao.getByEmail(email)
            return user;
        } catch(error) {
            console.log("Error al obtener el usuario por el email:", error);            
            throw new Error("Error en la base de datos");
        }
    }
};

export const userRepository = new UserRepository();