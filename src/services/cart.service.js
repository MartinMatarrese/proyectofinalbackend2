import Services from "./service.manager.js";
import { cartRepository } from "../repository/cart.repository.js";
import { productRepository } from "../repository/product.repository.js";
import { ticketService } from "./ticket.service.js";
import { productService } from "./product.service.js";
import { v4 as uuidv4 } from "uuid";

class CartServices extends Services {
    constructor() {
        super(cartRepository);
    }

    createCart = async(data) => {
        try {
            const { userId } = data            
            const newCart = await cartRepository.createCart(data);           
            return newCart;
        } catch(error) {            
            throw new Error("Error al crear el carrito" + error.message);            
        };
    };

    addProdToCart = async(cartId, prodId) => {
        try {
            return await cartRepository.addProductToCart(cartId, prodId);
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
            throw new Error(error);
        };
    }

    calculateTotalAmount = (products) => {
        return products.reduce((total, item) => {
            if(!item.price) {
                console.error("Producto sin precio:", item);
            };

            return total + (item.quantity * item.price || 0);
        }, 0)
    };

    purchaseCart = async(cartId) => {
        try {
            const cart = await cartRepository.getCartById(cartId);
        if(!cart) {
            throw new Error(`No se encontro el carrito con ID ${cartId}`);
        };
        if(!cart.products || !Array.isArray(cart.products)) {
            throw new Error(`El carrito con ID ${cartId} no tiene productos`);
            
        }
        let productsToPurchase = [];
        let productsOutStock = [];

        for(const item of cart.products) {
            const product = await productService.getProdById(item.id_prod);

            if(!product || product.stock < item.quantity) {
                productsOutStock.push(item);
            } else {
                product.stock -= item.quantity;
                await productService.updateProductStock(product.id, product.stock);
                productsToPurchase.push(item)
            };
        };

        if(productsToPurchase.length === 0) {
            throw new Error("No hay productos disponibles para comprar");
        };

        const ticketData = {
            code: uuidv4(),
            purchaser: cart.userId,
            amount: this.calculateTotalAmount(productsToPurchase),
            products: productsToPurchase.map(item => item.id_prod)
        };        

        const ticket = await ticketService.createTicket(ticketData);

        const productosRestantes = cart.products.filter(item => productsOutStock.find(out => out.id_prod === item.id_prod));
        await cartRepository.update(cart._id, { products: productosRestantes})

        return {ticket, productsOutStock};
        } catch(error) {                    
            throw new Error("Error al procesar la compra en el carrito" + error.message);            
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