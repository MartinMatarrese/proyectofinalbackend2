import { Router } from "express";
import { ticketController } from "../controllers/ticket.controllers";

const ticketRouter = Router();

ticketRouter.get("/", ticketController.createTicket);

ticketRouter.get("/:tid", ticketController.getTicket);

ticketController.post("/", ticketController.getTickets);

ticketController.put("/:tid", ticketController.updateTicket);

ticketController.delete("/:tid", ticketController.deleteTicket);

export default ticketRouter