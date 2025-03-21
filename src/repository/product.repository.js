import persistence from "../daos/persistence.js";
import ProductReqDto from "../dtos/product.req.dto.js";
import ProductResDto from "../dtos/product.res.dto.js";

const { prodDao } = persistence

class ProductRepository {
    constructor(){
        this.dao = prodDao
    }

    createProd = async(product) => {
        try {
            const prodDao = new ProductReqDto(product);
            return await this.dao.create(prodDao);
        } catch(error) {
            throw new Error(error);
        };
    };

    getProdById = async(id) => {
        try {
            const response = await this.dao.getById(id);
            return new ProductResDto(response)
        } catch(error) {
            throw new Error(error);
        };
    };
};

export const productRepository = new ProductRepository();