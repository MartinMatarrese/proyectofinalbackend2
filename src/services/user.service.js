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
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
            role: user.role,
            cart: user.cart
        };
        
        return jwt.sign(payLoad, process.env.SECRET_KEY, {expiresIn: "10m"});
    };

    getUserByEmail = async(email) => {
        try {            
            const user = await userRepository.getByEmail(email);            
            return user;
        } catch(error) {
            throw new Error("No se pudo obtener el usuario por el emial");
        }
    };

    register = async(user) => {
        try {
            const { email, password} = user;            
            const existUser = await this.getUserByEmail(email);
            
            if(existUser) throw new Error("El usuario ya existe");
           
            const passwordStr = String(password)
            if (!password) {
                throw new Error("La contraseña es obligatoria");
            }
            const hashedPassword = createHash(passwordStr);

            if (!hashedPassword) {
                throw new Error("Error al encriptar la contraseña");
            }
            
            const newUser = await userRepository.create({
                ...user,
                password: hashedPassword
            });

            const cartUser = await cartServices.createCart(newUser._id);
            const updateUser = await userRepository.update(newUser._id, { cart: cartUser._id});            
            return updateUser
        } catch(error) {            
            throw new Error(`Error al registrar el usuario: ${error.message}`);
        };
    };

    login = async(user) => {
        try {
            if(!user || !user.email || !user.password) {
                throw new Error("Faltan datos para iniciar sesión");
            }
            const { email, password } = user;
            const userExist = await this.getUserByEmail(email);
            if(!userExist) throw new Error("Usuario no encontrado");
            const passValid = isValidPassword(password, userExist);
            if(!passValid) throw new Error("Credenciales incorrectas");
            return this.generateToken(userExist);
        } catch (error) {
            throw new Error(error);
        }
    };
};

export const userService = new UserService();