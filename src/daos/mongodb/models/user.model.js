import { Schema, model } from "mongoose";

const userSchema = new Schema( {
    first_name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        minlength: [3, "Debe tener al menos 3 caracteres"],
        maxlength: 10
    },
    
    last_name: {
        type: String,
        required: [true, "El apellido es obligatorio"]
    },

    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: true, 
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },

    age: {
        type: Number,
        required: [true, "La edad es obligatoria"],
        min: [18, "Debes ser mayor de edad. {VALUE} es menor de edad"],
        max: 100
    },

    password: {
        type: String,
        required: true,
        minlength: [6, "La contraseña debe tener más de 6 caracteres"],
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