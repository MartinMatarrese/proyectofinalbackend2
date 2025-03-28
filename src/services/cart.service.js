import Services from "./service.manager.js";
import { cartRepository } from "../repository/cart.repository.js";
import { productRepository } from "../repository/product.repository.js";
import { ticketRepository } from "../repository/ticket.repository.js";

class CartServices extends Services {
    constructor() {
        super(cartRepository);
    }

    createCart = async() => {
        try {
            const newCart = await cartRepository.createCart({products: []});
            return newCart;
        } catch(error) {
            throw error            
        }
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
        if(!cart || !cart.products || cart.products.length === 0) {
            throw new Error("Carrito no encontrado");
        };
        
        let productsToPurchase = [];
        let productsOutStock = [];

        for(let item of cart.products) {
            const product = await productRepository.getById(item.id_prod);

            if(!product || product.stock < item.quantity) {
                productsOutStock.push(item.id_prod);
                continue;
            };
            product.stock -= item.quantity;
            await productRepository.update(product.id_prod, { stock: product.stock});
            productsToPurchase.push(item);
        };

        const totalAmount = calculateTotalAmount(productsToPurchase);        

        const ticketData = {
            purchaser: cart.user,
            amount: this.calculateTotalAmount(productsToPurchase),
            products: Array.isArray(productsToPurchase) ? productsToPurchase.map(item => item.id_prod) : []
        };
        

        const ticket = await ticketRepository.create(ticketData);        

        cart.products.filter(product => productsOutStock.includes(product.id_prod));
        await cartRepository.update(cart._id, { products: cart.products});

        return {ticket, productsOutStock};
        } catch(error) {            
            throw new Error("Error al procesar la compra en el carrito");            
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