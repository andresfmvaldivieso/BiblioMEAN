import express from "express";
import libros from "../controllers/libros.js"

const router = express.Router();
router.post("/registerLibro",libros.registerLibro);
router.get("/listarLibros",libros.listLibros);
router.put("/updateLibro",libros.updateLibros);
router.delete("/deleteLibros/:_id",libros.deleteLibros);
export default router;