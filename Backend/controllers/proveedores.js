import proveedores from "../models/proveedores.js";

 const registerProveedores =async (req,res)=>{
    if(!req.body.name || !req.body.address ) 
    return res.status(400).send("Incomplet data")

    const existingProveedor=await proveedores.findOne({name: req.body.name});
    if (existingProveedor) return res.status(400).send("The supplier already exist");

    const proveedorSchema = new proveedores({
        name: req.body.name,
        address: req.body.address,
    });
    const result = await proveedorSchema.save();
    if (!result) return res.status(400).send("fallo el proceso de registro");
    return res.status(200).send({result});

 }
 const listProveedores = async (req,res)=>{
    const proveedorSchema =await proveedores.find();
    if (!proveedorSchema || proveedorSchema.length==0)return res.status(400).send("Empty supplier list");
    return res.status(200).send({proveedorSchema});
 };

 export default {registerProveedores,listProveedores};