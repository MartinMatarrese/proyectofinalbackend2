import persistence from "../daos/persistence";
import { ticketRepository } from "../repository/ticket.repository";
import Services from "./service.manager";

const { ticketDao } = persistence;

class TicketService extends Services {
    constructor() {
        super(ticketDao)
    };

    getById = async(id) => {
        try {
            const ticket = await ticketRepository.getById(id);
            if(!ticket) {
                throw new Error(`Ticket con ID ${id} no encontrado`);
            }
            return ticket;
        } catch(error) {
            throw new Error(`Error en getById: ${error.message}`);
        };
    };

    getAll = async() => {
        try {
            return await ticketRepository.getAll();
        } catch(error) {
            throw new Error(`Error en getAll: ${error.message}`);
        };
    };

    create = async(ticketData) => {
        try {
            return ticketRepository.create(ticketData);
        } catch(error) {
            throw new Error(`Error en create: ${error.message}`);
        };
    };

};

export const ticketService = new TicketService();