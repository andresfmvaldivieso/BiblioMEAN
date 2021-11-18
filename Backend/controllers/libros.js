import libros from "../models/libros.js";

const registerLibro = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.author ||
    !req.body.yearPublication ||
    !req.body.page ||
    !req.body.gender ||
    !req.body.price
  )
    return res.status(400).send("Incoplet data");

  const existingLibro = await libros.findOne({ name: req.body.name });
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
  return res.status(200).send({ result });
};
const listLibros = async (req, res) => {
  const libroSchema = await libros.find();
  if (!libroSchema || libroSchema.length == 0)
    return res.status(400).send("Empty book list");
  return res.status(200).send({ libroSchema });
};
const updateLibros = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.author ||
    !req.body.yearPublication ||
    !req.body.page ||
    !req.body.gender ||
    !req.body.price
  )
    return res.status(400).send("Incomplet data");

  const existingLibro = await libros.findOne({
    name: req.body.name,
    author: req.body.author,
    yearPublication: req.body.yearPublication,
    page: req.body.page,
    gender: req.body.gender,
    price: req.body.price,
  });
  if (existingLibro) return res.status(400).send("The book already exist");
  const librosUpdate = await libros.findByIdAndUpdate(req.body._id,{
   name: req.body.name,
   author: req.body.author,
   yearPublication: req.body.yearPublication,
   page: req.body.page,
   gender: req.body.gender,
   price: req.body.price,

  });
  return !librosUpdate
  ? res.status(400).send("Error editing book")
  : res.status(200).send({ librosUpdate});

};
const deleteLibros = async (req, res) => {
   const librosDelete = await libros.findByIdAndDelete( { _id: req.params["_id"]});
   return !librosDelete
   ? res.status(400).send("book no fount")
   : res.status(200).send("book deleted")
}
const listarLibro =async (req, res) => {
      const libroId =await libros.findById({ _id: req.params["_id"]});
      return !libroId 
      ? res.status(400).send("book no fount")
      : res.status(200).send({libroId})
}
export default { registerLibro, listLibros,updateLibros, deleteLibros,listarLibro };
