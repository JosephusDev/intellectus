import express from "express";
import {carregar, cadastrar, eliminar, alterarStatus} from "../controllers/Trabalho.js";

const router = express.Router();

router.get("/", carregar)

router.post("/", cadastrar)

router.delete("/:id", eliminar)

router.put("/:id", alterarStatus)

export default router;