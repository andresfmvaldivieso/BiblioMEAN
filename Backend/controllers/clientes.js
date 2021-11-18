import clientes from "../models/clientes.js";
import role from "../models/role.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import moment from "moment";

const registerClientes = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password )
    return res.status(400).send("Incomplet data");

  const existingCliente = await clientes.findOne({ email: req.body.email });
  if (existingCliente) return res.status(400).send("The client already exist");

  const roleId = await role.findOne({name: "user"});
  if (!roleId) return res.status(400).send({message: "No role was assigned"})

  const hash = await bcrypt.hash(req.body.password, 10);

  const clienteSchema = new clientes({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    roleId:roleId._id,
    dbStatus: true,
  });
  const result = await clienteSchema.save();
  
  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: result._id,
          name: result.name,
          roleId: result.roleId,
          iat: moment().unix(),
        },
        process.env.SECRET_KEY_JWT
      ),
    });
  } catch (e) {
    return res.status(400).send({ message: "Register Error" });
  }
};
const listClientes = async (req, res) => {
  const clienteSchema = await clientes.find();
  if (!clienteSchema || clienteSchema.length == 0)
    return res.status(400).send("Empty client list");
  return res.status(200).send({ clienteSchema });
};

const updateCliente = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Incomplet data");

  
  let pass = "";

  if (req.body.password) {
    pass = await bcrypt.hash(req.body.password, 10);
  } else {
    const userFind = await clientes.findOne({ email: req.body.email });
    pass = userFind.password;
  }

  const existingCliente = await clientes.findOne({
    name: req.body.name,
    email: req.body.email,
    password: pass
  });
  if (existingCliente) return res.status(400).send("Client already exist");

  const clienteUpdate = await clientes.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: pass,
    roleId: req.body.roleId
  });
  return !clienteUpdate
    ? res.status(400).send("Error editing client")
    : res.status(200).send({ clienteUpdate });
};

const deleteCliente = async (req, res) => {
  const clienteDelete = await clientes.findByIdAndDelete({
    _id: req.params["_id"],
  });
  return !clienteDelete
    ? res.status(400).send("client no fount")
    : res.status(200).send("Client delete");
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status("400").send({ message: "Incomplete data" });

  const existingUser = await clientes.findOne({ email: req.body.email });
  if (!existingUser) return res.status(400).send("Wrong email or password");

  const hash = await bcrypt.compare(req.body.password, existingUser.password);
  if (!hash) return res.status(400).send("Wrong email ");

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: existingUser._id,
          name: existingUser.name,
          roleId: existingUser.roleId,
          iat: moment().unix(),
        },
        process.env.SECRET_KEY_JWT
      ),
    });
  } catch (e) {
    return res.status(400).send({ message: "login Error" },e);
  }
};
export default {
  registerClientes,
  listClientes,
  updateCliente,
  deleteCliente,
  login,
};
