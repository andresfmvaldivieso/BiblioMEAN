import express from "express";
import proveedores from "../controllers/proveedores.js"

const router = express.Router();
router.post("/registerProveedores",proveedores.registerProveedores);
router.get("/listarProveedores", proveedores.listProveedores);

export default router;