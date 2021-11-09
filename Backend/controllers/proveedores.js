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

 const updateProveedores= async (req, res) => {
   if(!req.body.name || !req.body.address ) 
   return res.status(400).send("Incomplet data")

   const existingProveedor=await proveedores.findOne({
      name: req.body.name,
      address: req.body.address
   });
    if (existingProveedor) return res.status(400).send("The supplier already exist");
    const proveedoresUpdate = await proveedores.findByIdAndUpdate(req.body._id ,{
      name: req.body.name,
      address: req.body.address
    });
    return !proveedoresUpdate
    ? res.status(400).send("Error editing supplier")
    : res.status(200).send({proveedoresUpdate});
 }

 const deleteProveedores = async (req, res) => {
    const proveedoresDelete =await proveedores.findByIdAndDelete({ _id: req.params["_id"]})
    return !proveedoresDelete 
    ? res.status(400).send("supplier no fount")
    : res.status(200).send("supplier delete")
 }

 export default {registerProveedores,listProveedores, updateProveedores, deleteProveedores};