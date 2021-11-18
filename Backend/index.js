import express from "express";
import cors from "cors";
import db from "./db/db.js";
import dotenv from "dotenv";
import libros from "./routes/libros.js"
import clientes from "./routes/clientes.js"
import roles from "./routes/role.js"
import proveedores from "./routes/proveedores.js"

dotenv.config();
const app =express();

app.use(express.json());
app.use(cors());
app.use("/api/libro",libros);
app.use("/api/roles",roles)
app.use("/api/clientes", clientes);
app.use("/api/proveedores", proveedores);


app.listen(process.env.PORT, ()=> console.log("Backend server running on port "+ process.env.PORT))

db.dbConnection();