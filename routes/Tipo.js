import express from "express";
import {carregar} from "../controllers/Tipo.js";

const router = express.Router();

router.get("/", carregar)

export default router;