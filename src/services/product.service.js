import persistence from "../daos/persistence.js";
import { productRepository } from "../repository/product.repository.js";
import Services from "./service.manager.js";

const { prodDao } = persistence;

class ProductService extends Services {
    constructor() {
        super(prodDao)
    };

    getProdById = async(id) => {
        try {
            return await productRepository.getProdById(id);
        } catch(error) {
            throw Error(error);
        };
    };

    updateProductStock = async(id, stock) => {
        return await productRepository.findByIdUpdate(id, {stock}, {new: true});
    }
};

export const productService = new ProductService();