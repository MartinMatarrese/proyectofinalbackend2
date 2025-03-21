import Services from "./service.manager.js";
import cartModel from "../daos/mongodb/models/cart.model.js";

const cartDao = cartModel;

class CartServices extends Services {
    constructor() {
        super(cartDao);
    }

    createCart = async() => {
        try {
            const newCart = await this.dao.create({products: []});
            return newCart;
        } catch(error) {
            throw error            
        }
    };

    addProdToCart = async(cartId, prodId) => {
        try {
            return await this.dao.addProdToCart(cartId, prodId);
        } catch(error) {
            throw error            
        }
    };

    removeProdToCart = async(cartId, prodId) => {
        try {
            return await this.dao.removeProdToCart(cartId, prodId);
        } catch(error) {
            throw error            
        }
    };

    upDateProdQuantityToCart = async(cartId, prodId, quantity) => {
        try {
            return await this.dao.upDateProdQuantityToCart(cartId, prodId, quantity);
        } catch(error) {
            throw error            
        }
    };

    getCartById = async(cartId) => {
        try {
            return await this.dao.getCartById(cartId)
        } catch(error) {
            throw error
        }
    }

    purchaseCart = async(cartId) => {
        const cart = await this.getCartById(cartId);
        if(!cart || cart.products.length === 0) {
            throw new Error("El carrito esta vacio o no existe");
        };

        const insuficientStock = [];
        const successFullPurchase = [];
        const totalAmount = 0;

        for(let item of cart.products) {
            const product = await this.productService.getProductById(item.product);
            if(product.stock >= item.quantity) {
                product.stock -= item.quantity
                await productService.updateProduct(product);
                successFullPurchase.push(product);
                totalAmount +- product.price * item.quantity;
            } else {
                insuficientStock.push(product);
            };
        };

        if(insuficientStock.length > 0) {
            throw new Error("No hay suficiente stock para los siguientes productos");
        };

        const ticketData = { cart, successFullPurchase, totalAmount };
        const ticket = await ticketRepository.create(ticketData);
        await this.clearCart(cartId);
        return ticket;
    };

    clearCart = async(cartId) => {
        try {
            return await this.dao.clearCart(cartId);
        } catch(error) {
            throw error            
        }
    };
};

export const cartServices = new CartServices();