import cartModel from "./models/cart.model.js";
import MongoDao from "./mongo.dao.js";

class CartDaoMongo extends MongoDao {
    constructor() {
        super(cartModel)
    };

    // createCart = async() => {
    //     try {
    //         const newCart = await cartModel.create({products: []});
    //         return newCart;
    //     } catch(error) {
    //         throw Error(error);
    //     };
    // };


};

export const cartDao = new CartDaoMongo();