import cartModel from "../daos/mongodb/models/cart.model.js";
import { cartServices } from "../services/cart.service.js";

export class CartControllers {
    constructor() {
        this.getCart = this.getCart.bind(this);
        this.createCart = this.createCart.bind(this);
        this.insiderProductCart = this.insiderProductCart.bind(this);
        this.updateProductsCart = this.updateProductsCart.bind(this);
        this.updateQuantityProductCart = this.updateQuantityProductCart.bind(this);
        this.deleteProductCart = this.deleteProductCart.bind(this);
        this.deleteCart = this.deleteCart.bind(this);
    }
    getCart = async (req, res) => {
        try {
            const cartId = req.params.cid
            const cart = await cartModel.findOne({_id: cartId})
            res.status(200).send(cart)
        } catch(e) {
            res.status(500).send(e)
        }
    };
    
    createCart = async (req, res) => {
        try {
            const respuesta = await cartServices.create({products: []})
            res.status(201).send(respuesta)
        } catch(e) {
            res.status(500).send(e)
        }
    };
    
    insiderProductCart = async (req, res) => {
        try {
            const cartId = req.params.cid
            const productId = req.params.pid
            const {quantity} = req.body
            const cart = await cartModel.findById(cartId)
            const indice = cart.products.findIndex(prod => prod.id_prod._id == productId)
            if(cart) {
                if(indice != -1) {
                    cart.products[indice].quantity = quantity
                } else {
                    cart.products.push({id_prod: productId, quantity: quantity})
                }
                const mensaje = await cartModel.findByIdAndUpdate(cartId, cart)
                res.status(200).send(mensaje)
            } else {
                res.status(404).send("El carrito no existe")
            }
        } catch(e) {
            res.status(500).send(e)
        }
    };
    
    updateProductsCart = async (req, res) => {
        try {
            const cartId = req.params.cid
            const {newProducts} = req.body
            const cart = await cartModel.findOne({_id: cartId})
           cart.products = newProducts
           cart.save()
           res.status(200).send(cart)
        } catch(e) {
            res.status(500).send(e)
        }
    };
    
    updateQuantityProductCart = async (req, res) => {
        try {
            const cartId = req.params.cid
            const productId = req.params.pid
            const {quantity} = req.body
            const cart = await cartModel.findOne(cartId)
            const indice = cart.products.findIndex(prod => prod.id_prod._id == productId) 
            if(indice != -1) { 
                cart.products[indice].quantity = quantity
            } else {
                res.status(404).send("producto no existe")
            }
        }catch(e) {
            console.log(e);
            res.status(500).send(e)        
        }
    };
    
    deleteProductCart = async (req, res) => {
        try {
            const cartId = req.params.cid
            const productId = req.params.pid
            const cart = await cartModel.findOne({_id: cartId})
            const indice = cart.products.findIndex(prod => prod.id_prod._id == productId)
            if(indice != -1) {
                cart.products.splice(indice, 1)
                cart.save()
                res.status(200).send(cart)
            } else {
                res.status(404).send("Producto no existe")
            }
        } catch(e) {
            res.status(500).send(e)
        }
    };
    
    deleteCart = async (req, res) => {
        try {
            const cartId = req.params.cid
            const cart = await cartModel.findOne({_id: cartId})
            cart.products = []
            cart.save()
            res.status(200).send(cart)
        } catch(e) {
            res.status(500).send(e)
        }
    };
};