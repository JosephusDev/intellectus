import express from "express";
import {carregar} from "../controllers/Categoria.js";

const router = express.Router();

router.get("/", carregar)

export default router;