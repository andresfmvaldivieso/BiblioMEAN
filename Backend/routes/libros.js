import express from "express";
import libros from "../controllers/libros.js"
import auth from "../middlewares/auth.js"
import admin from "../middlewares/admin.js"

const router = express.Router();
router.post("/registerLibro",auth,admin,libros.registerLibro);
router.get("/listarLibros",auth,libros.listLibros);
router.get("/listarLibro/:_id",auth,libros.listarLibro);
router.put("/updateLibro",auth,admin,libros.updateLibros);
router.delete("/deleteLibros/:_id",auth,admin,libros.deleteLibros);
export default router;