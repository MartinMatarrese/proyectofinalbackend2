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
        
        return jwt.sign(payLoad, process.env.SECRET_KEY, {expiresIn: "10m"});
    };

    getUserByEmail = async(email) => {
        try {
            console.log("Buscando usuario en userRepository con email:", email);            
            const user = await userRepository.getByEmail(email);
            console.log("Resultado de userRepository.getByEmail:", user);            
            return user;
        } catch(error) {
            console.error("Error en getUserByEmail:", error)
            throw new Error("No se pudo obtener el usuario por el emial");
        }
    };

    register = async(user) => {
        try {
            const { email, password} = user;
            console.log("Email recibido", email);
            console.log("Password recibida:", password);
            
            console.log("Intentando buscar ususario en la base de datos...");
            
            const existUser = await this.getUserByEmail(email);
            console.log("Resultado de getUserByEmail", existUser);
            
            if(existUser) throw new Error("El usuario ya existe");
            console.log("Usuario no encontrado, creando carrito...");

            const cartUser = await cartServices.createCart();
            console.log("Carrito creado:", cartUser);
            if(!cartUser || !cartUser._id) {
                throw new Error("Error al crear el carrito")
            }
            console.log("Creando usuario");
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
                password: hashedPassword,
                cart: cartUser._id
            });
            console.log("Usuario registrado con éxito:", newUser);
            
            return newUser;
        } catch(error) {
            console.log("Error detallado:", error);
            
            throw new Error(`Error al registrar el usuario: ${error.message}`);
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