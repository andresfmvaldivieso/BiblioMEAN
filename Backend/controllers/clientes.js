import clientes from "../models/clientes.js";

 const registerClientes =async (req,res)=>{
    if(!req.body.name || !req.body.email || !req.body.password ) 
    return res.status(400).send("Incomplet data")

    const existingCliente=await clientes.findOne({name: req.body.name});
    if (existingCliente) return res.status(400).send("The client already exist");

    const clienteSchema = new clientes({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        dbStatus: true
    });
    const result = await clienteSchema.save();
    if (!result) return res.status(400).send("fallo el proceso de registro");
    return res.status(200).send({result});

 }
 const listClientes = async (req,res)=>{
    const clienteSchema =await clientes.find();
    if (!clienteSchema || clienteSchema.length==0)return res.status(400).send("Empty client list");
    return res.status(200).send({clienteSchema});
 };

 export default {registerClientes,listClientes};