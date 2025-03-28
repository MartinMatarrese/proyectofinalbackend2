import Controllers from "./controller.manager.js";
import { userService } from "../services/user.service.js";

class UserController extends Controllers {
    constructor() {
        super(userService)
    };

    register = async(req, res, next) => {
        try {
            const user = await this.service.register(req.body);
            return res.status(201).json(user);
        } catch(error) {
            // next(error)
            res.status(500).json({error: "Error interno en el servidor"})
        }
    };

    login = async(req, res, next) => {
        try {
            const token = await this.service.login(req.body);
            res
            .cookie("token", token, { httpOnly: true })
            .json({ message: "Login Ok", token});
        } catch(error) {
            if(error.message === "Usuario no encontrado" || error.message === "Credenciales incorrectas") {
                return res.status(401).json({ error: error.message });
            };
            next(error);
        };
    };

    privateData = async(req, res, next) => {
        try {
            if(!req.user)
                throw new Error("No se puede acceder a los datos del usuario");
                res.json({
                    user: req.user
                });
        } catch(error) {
            next(error)
        }
    };
}

export const userContoller = new UserController();