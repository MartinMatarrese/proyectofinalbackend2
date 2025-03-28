import { ticketService } from "../services/ticket.service.js";
import Controllers from "./controller.manager.js";

class TicketController extends Controllers {
    constructor() {
        super(ticketService)
    };

    createTicket = async(req, res, next) => {
        try {
            const { purchaser, amount, products } = req.body;
            const ticketData = {
                purchaser,
                amount,
                products
            };
            console.log("Datos para crear el ticket:", {
                purchaser: cart.user,
                amount: totalAmount,
                products: productsToPurchase.map(p => p._id)
            });
            
            const ticket = await ticketService.createTicket(ticketData)
            return res.status(201).json(ticket);
        } catch (error) {
            next(error);
        };
    };
};

export const ticketController = new TicketController();