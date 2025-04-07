import persistence from "../daos/persistence.js";
import ProductReqDto from "../dtos/product.req.dto.js";
import ProductResDto from "../dtos/product.res.dto.js";

const { prodDao } = persistence

class ProductRepository {
    constructor(){
        this.dao = prodDao
    }

    getAll = async() => {
        try {
            const products = await this.dao.getAll();
            return products.map(prod => new ProductResDto(prod));
        } catch(error) {
            throw new Error(error);            
        }
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

    updateProductStock = async(id, data) => {
        try {
            const updateProd = await this.dao.update(id, data, {new: true});
            return updateProd
        } catch (error) {
            throw new Error(error)
        }
    }
};

export const productRepository = new ProductRepository();