import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true, 
        minLength: [3, "First Name Must Conatine At Least 3 Characters!"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last Name Must Contain At Least 3 Character!"]
    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Provide A Valid Email"]
    },
    phone: {
        type: Number,
        required: true,
        minLength: [3, "Phone Number Must Conatin Exact 11 Digits!"],
        maxLength: [10, "Phone Number Must Contain Exact 11 Digits!"]
    },
    message:{
        type: String,
        required: true,
        minLength: [10, "Message Must Conatin At Least 10 Characters!!"],
    }
})

export const Message = mongoose.model("Message", messageSchema)