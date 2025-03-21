import cartModel from "./models/cart.model";
import MongoDao from "./mongo.dao";

class TicketDaoMongo extends MongoDao {
    constructor() {
        super(cartModel)
    };
};

export const ticketDao = new TicketDaoMongo();