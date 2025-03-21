import persistence from "../daos/persistence";
import UserReqDto from "../dtos/user.req.dto";
import UserResDto from "../dtos/user.res.dto";

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
};

export const userRepository = new UserRepository();