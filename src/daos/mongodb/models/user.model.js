import { Schema, model } from "mongoose";

const userSchema = new Schema( {
    first_name: {
        type: String,
        required: true
    },
    
    last_name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true 
    },

    age: {
        type: Number,
        required: true
    },

    password: {
        type: String,
        required: true,
        default: ""
    },

    cart: {
        type: Schema.Types.ObjectId,
        ref: "carts",
        default: null
    },

    role: {
        type: String,
        default: "user"
    }
})

export const userModel = model("users", userSchema)