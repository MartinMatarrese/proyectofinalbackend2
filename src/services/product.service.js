import { productRepository } from "../repository/product.repository.js";
import Services from "./service.manager.js";

class ProductService extends Services {
    constructor() {
        super(productRepository)
    };

    getProdById = async(id) => {
        try {
            return await productRepository.getProdById(id);
        } catch(error) {
            throw Error(error);
        };
    };

    updateProductStock = async(id, stock) => {
        return await productRepository.updateProductStock(id, { stock: Number(stock) });
    }
};

export const productService = new ProductService();