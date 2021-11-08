import express from "express";
import clientes from "../controllers/clientes.js"

const router = express.Router();
router.post("/registerCliente",clientes.registerClientes);
router.get("/listarClientes", clientes.listClientes);

export default router;