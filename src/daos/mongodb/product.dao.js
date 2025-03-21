import productModel from "./models/product.model.js";
import MongoDao from "./mongo.dao.js";

class ProductDaoMongo extends MongoDao {
    constructor() {
        super(productModel)
    };
};

export const prodDao = new ProductDaoMongo();