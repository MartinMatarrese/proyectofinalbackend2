import cartModel from "./models/cart.model.js";
import MongoDao from "./mongo.dao.js";

class TicketDaoMongo extends MongoDao {
    constructor() {
        super(cartModel)
    };
};

export const ticketDao = new TicketDaoMongo();