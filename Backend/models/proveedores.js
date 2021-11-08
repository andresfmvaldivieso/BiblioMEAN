import mongoose from "mongoose";

const proveedorSchemas = new mongoose.Schema({
    name: String,
    address: String,
    registerDate: {type: Date ,default: Date.now},
})

const proveedor = mongoose.model("proveedores",proveedorSchemas);

export default proveedor;