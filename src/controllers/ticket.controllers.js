import { cartServices } from "../services/cart.service.js";
import { ticketService } from "../services/ticket.service.js";
import Controllers from "./controller.manager.js";

class TicketController extends Controllers {
    constructor() {
        super(ticketService)
    };

    getTickets = async(req, res, next) => {
        try {
            const { id } = req.params
            const tickets = await ticketService.getAll(id);
            res.status(200).send(tickets);
        } catch(error) {
            next(error);
        };
    };

    getTicket = async(req, res, next) => {
        try {
            const { tid } = req.params;
            const ticket = await ticketService.getById(tid);
            res.status(200).json(ticket);
        } catch(error) {
            next(error);
        };
    };

    createTicket = async(req, res, next) => {
        try {
            const { cartId, _Id } = req.body
            const cart = await cartServices.getCartById(cartId);
            const products = cart.products;
            let totalAmount = 0;
            const unavailableProducts = [];
            for (const product of products) {
                const currentProduct = await product.findById(product.id_prod);
    
                if (currentProduct.stock >= product.quantity) {
                    currentProduct.stock -= product.quantity;
                    await currentProduct.save();
                    totalAmount += product.price * product.quantity;
                } else {
                    unavailableProducts.push(product.id_prod);
                }
            }
            if (unavailableProducts.length > 0) {
                return res.status(400).json({
                    message: "Algunos productos no tienen suficiente stock",
                    unavailableProducts,
                });
            }
            const ticketData = {    
                amount: totalAmount,
                purchaser: _Id,                
                products: products.map(product => ({                    
                    product_id: product.id_prod,
                    quantity:product.quantity,
                    price: product.price
                }))                
            };
            const newTicket = await ticketService.create(ticketData);
            res.status(201).json({message: "Ticket creado correctamente", ticket: newTicket});
        } catch(error) {
            next(error);
        };
    };

    updateTicket = async(req, res, next) => {
        try {
            const { id } = req.params;
            const updateTicket = req.body;
            await ticketService.upDate(id, updateTicket);
            res.status(200).json({message: "Ticket actualizado correctamente"})
        } catch(error) {
            next(error)
        };
    };

    deleteTicket = async(req, res, next) => {
        try {
            const { id } = req.params;
            await ticketService.delete(id);
            res.status(200).json({message: "Ticket eliminado correctamente"});
        } catch(error) {
            next(error);
        };
    };
};

export const ticketController = new TicketController();