import { Schema, model } from "mongoose";

const ticketSchema = new Schema( {
    code: {
        type: String,
        unique: true,
        required: true
    },
    purchese_datetime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }

});

const ticketModel = model("ticket", ticketSchema);
export default ticketModel