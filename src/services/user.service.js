import { createHash, isValidPassword } from "../utils/utils.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import Services from "./service.manager.js";
import { cartServices } from "./cart.service.js";
import { userRepository } from "../repository/user.repositrory.js";

class UserService extends Services {
    constructor() {
        super(userRepository);
    }

    generateToken = (user) => {
        const payLoad = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
            role: user.role,
            cart: user.cart
        };
        
        return jwt.sign(payLoad, process.env.SECRET_KEY, {expiresIn: "10M"});
    };

    getUserByEmail = async(email) => {
        try {
            return await userRepository.getByEmail(email);
        } catch(error) {
            throw new Error("No se pudo obtener el usuario por el emial");
        }
    };

    register = async(user) => {
        try {
            const { email, password} = user;
            const existUser = await this.getUserByEmail(email);
            if(existUser) throw new Error("El usuario ya existe");
            const cartUser = await cartServices.createCart();
            const newUser = await userRepository.create({
                ...user,
                password: createHash(password),
                cart: cartUser._id
            });
            return newUser;
        } catch(error) {
            throw new Error("Error al registrar el usuario");
        }
    };

    login = async(user) => {
        try {
            const { email, password } = user;
            const userExist = await this.getUserByEmail(email);
            if(!userExist) throw new Error("Usuario no encontrado");
            const passValid = isValidPassword(password, userExist);
            if(!passValid) throw new Error("Credenciales incorrectas");
            return this.generateToken(userExist);
        } catch (error) {
            throw new Error("Error al inicio de sesión");
        }
    };
};

export const userService = new UserService();