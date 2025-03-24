import persistence from "../daos/persistence.js";
import Services from "./service.manager.js";

const { ticketDao } = persistence;

class TicketService extends Services {
    constructor() {
        super(ticketDao)
    };

    createTicket = async(ticketData) => {
        const ticket = new ticket(ticketData);
        return await ticket.save();
    };

};

export const ticketService = new TicketService();