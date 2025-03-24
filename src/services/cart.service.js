import Services from "./service.manager.js";
import persistence from "../daos/persistence.js";
import ticketModel from "../daos/mongodb/models/ticket.model.js";
import { cartRepository } from "../repository/cart.repository.js";
import { productService } from "./product.service.js";

const { cartDao } = persistence

class CartServices extends Services {
    constructor() {
        super(cartDao);
    }

    createCart = async() => {
        try {
            const newCart = await cartRepository.create({products: []});
            return newCart;
        } catch(error) {
            throw error            
        }
    };

    addProdToCart = async(cartId, prodId) => {
        try {
            return await cartRepository.addProdToCart(cartId, prodId);
        } catch(error) {
            throw error            
        }
    };

    removeProdToCart = async(cartId, prodId) => {
        try {
            return await cartRepository.removeProdToCart(cartId, prodId);
        } catch(error) {
            throw error            
        }
    };

    upDateProdQuantityToCart = async(cartId, prodId, quantity) => {
        try {
            return await cartRepository.upDateProdQuantityToCart(cartId, prodId, quantity);
        } catch(error) {
            throw error            
        }
    };

    getCartById = async(cartId) => {
        try {
            return await cartRepository.getCartById(cartId)
        } catch(error) {
            throw error
        }
    }

    purchaseCart = async(cartId, email) => {
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
                successFullPurchase.push({
                    product: item.product,
                    quantity: item.quantity,
                    price: product.price
                });
                totalAmount += product.price * item.quantity;
            } else {
                insuficientStock.push(product);
            };
        };

        if(insuficientStock.length > 0) {
            const ticketData = {
                amount: totalAmount,
                purchaser: email
            }
            const ticket = await ticketModel.create(ticketData);
            cart.porudcts = insuficientStock;
            await cart.save();
            return { ticket, insuficientStock };
        } else {
            throw new Error("No se pudo hacer la compra por falta de stock");            
        };
    };

    clearCart = async(cartId) => {
        try {
            return await cartRepository.clearCart(cartId);
        } catch(error) {
            throw error            
        }
    };
};

export const cartServices = new CartServices();