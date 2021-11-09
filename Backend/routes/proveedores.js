import express from "express";
import proveedores from "../controllers/proveedores.js"

const router = express.Router();
router.post("/registerProveedores",proveedores.registerProveedores);
router.get("/listarProveedores", proveedores.listProveedores);
router.put("/updateProveedores", proveedores.updateProveedores);
router.delete("/deleteProveedores/:_id", proveedores.deleteProveedores);

export default router;