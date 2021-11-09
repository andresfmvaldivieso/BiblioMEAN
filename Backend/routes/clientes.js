import express from "express";
import clientes from "../controllers/clientes.js"

const router = express.Router();
router.post("/registerCliente",clientes.registerClientes);
router.get("/listarClientes", clientes.listClientes);
router.put("/updateCliente",clientes.updateCliente);
router.delete("/deleteCliente/:_id",clientes.deleteCliente);

export default router;