import express from "express";
import role from "../controllers/role.js";


const router = express.Router();

router.post("/registerRole",role.registerRole);
router.get("/listRole",role.listRole);
router.put("/updateRole",role.updateRole);
router.delete("/deleteRole/:_id",role.deleteRole);

export default router;