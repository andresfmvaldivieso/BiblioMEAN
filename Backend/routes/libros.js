import express from "express";
import libros from "../controllers/libros.js"

const router = express.Router();
router.post("/registerLibro",libros.registerLibro);
router.get("/listarLibros",libros.listLibros);

export default router;