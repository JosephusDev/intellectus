import express from "express";
import {carregar} from "../controllers/Unidade.js";

const router = express.Router();

router.get("/", carregar)

export default router;