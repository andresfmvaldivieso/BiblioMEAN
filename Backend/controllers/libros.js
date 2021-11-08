import libros from "../models/libros.js";

 const registerLibro =async (req,res)=>{
    if(!req.body.name || !req.body.author || !req.body.yearPublication || !req.body.page || !req.body.gender || !req.body.price) return res.status(400).send("Incoplet data")

    const existingLibro=await libros.findOne({name: req.body.name});
    if (existingLibro) return res.status(400).send("The book already exist");

    const libroSchema = new libros({
        name: req.body.name,
        author: req.body.author,
        yearPublication: req.body.yearPublication,
        page: req.body.page,
        gender: req.body.gender,
        price: req.body.price,
    });
    const result = await libroSchema.save();
    if (!result) return res.status(400).send("fallo el proceso de registro");
    return res.status(200).send({result});

 }
 const listLibros = async (req,res)=>{
    const libroSchema =await libros.find();
    if (!libroSchema || libroSchema.length==0)return res.status(400).send("Empty book list");
    return res.status(200).send({libroSchema});
 };

 export default {registerLibro,listLibros};