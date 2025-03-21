import persistence from "../daos/persistence.js";
import CartReqDto from "../dtos/cart.req.dto.js";
import CartResDto from "../dtos/cart.res.dto.js";

const { cartDao } = persistence

class CartRepository {
    constructor(){
        this.dao = cartDao
    }

    addProductToCart =async (cartId, productId, quantity) => {
        try {
            const cartDao = new CartReqDto(cartId, productId, quantity);
            return await this.dao.addProductToCart(cartDao);
        } catch(error) {
            throw new Error(error)
        }
    };

    getCartById = async(id) => {
        try {
            const response = new CartResDto(id);
            return await this.dao.getCartById(response)
        } catch(error) {
            throw new Error(error)
        }
    };
};

export const cartRepository = new CartRepository();