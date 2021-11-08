import mongoose from "mongoose";

const clienteShema= new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    registerDate: {type: Date ,default: Date.now},
    dbStatus: Boolean,
})

const cliente= mongoose.model("clientes",clienteShema);

export default cliente;