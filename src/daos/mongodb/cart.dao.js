import cartModel from "./models/cart.model.js";
import MongoDao from "./mongo.dao.js";

class CartDaoMongo extends MongoDao {
    constructor() {
        super(cartModel)
    };
};

export const cartDao = new CartDaoMongo();