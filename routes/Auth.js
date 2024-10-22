import express from "express"
import {submeterEmail, autenticarToken, cadastro} from "../controllers/Auth.js"

const router = express.Router()

router.post("/send-magic-link", submeterEmail)

router.post("/cadastro", cadastro)

router.get('/auth/:token/:user', autenticarToken);

export default router