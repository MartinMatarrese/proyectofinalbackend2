import { prodDao as prodDaoFs } from "./filesystem/product.dao.js";
import { prodDao as prodDaoMongo } from "./mongodb/product.dao.js";
import { cartDao as cartDaoFs } from "./filesystem/cart.dao.js";
import { cartDao as cartDaoMongo } from "./mongodb/cart.dao.js";
import { ticketDao as ticketDaoFs } from "./filesystem/ticket.dao.js";
import { ticketDao as ticketDaoMongo } from "./mongodb/ticket.dao.js";
import { userDao as UserDaoFs } from "./filesystem/user.dao.js";
import {userDao as UserDaoMongo } from "./mongodb/user.dao.js";
import { initMongoDB } from "../db/dbConfig.js";

let prodDao;

let cartDao;

let ticketDao;

let userDao;

const persistence = process.argv[2];
console.log("Modo de persistencia recibido:", process.argv[2]);


switch(persistence) {
    case "fs":
        prodDao = prodDaoFs;
        cartDao = cartDaoFs;
        ticketDao = ticketDaoFs;
        userDao = UserDaoFs;
        console.log(persistence);
        break;
    case "mongo":
        prodDao = prodDaoMongo;
        cartDao = cartDaoMongo;
        ticketDao = ticketDaoMongo;
        userDao = UserDaoMongo;
        await initMongoDB()
        .then(() => console.log("Base de datos conectada"))
        .catch((error) => console.log(error))
        console.log(persistence);
        break;
    default:
        prodDao = prodDaoFs;
        cartDao = cartDaoFs
        ticketDao = ticketDaoFs;
        userDao = UserDaoFs;
        break;    
};
console.log("UserDao seleccionado:", userDao);


export default { prodDao, cartDao, ticketDao, userDao };