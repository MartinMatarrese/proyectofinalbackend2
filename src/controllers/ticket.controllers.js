import { ticketService } from "../services/ticket.service";
import Controllers from "./controller.manager";

class TicketController extends Controllers {
    constructor() {
        super(ticketService)
    };

    getTickets = async(req, res, next) => {
        try {
            const tickets = await ticketService.getTickets();
            res.status(200).send(tickets);
        } catch(error) {
            next(error);
        };
    };

    getTicket = async(req, res, next) => {
        try {
            const { id } = req.params;
            const ticket = await ticketService.getTicket(id);
            res.status(200).json(ticket);
        } catch(error) {
            next(error);
        };
    };

    createTicket = async(req, res, next) => {
        try {
            const ticket = req.body;
            await ticketService.create(ticket)
            res.status(201).json({message: "Ticket creado correctamente"});
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