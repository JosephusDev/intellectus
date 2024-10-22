import express from "express"
import cors from "cors"
import routerAuth from "./routes/Auth.js"
import routerTipo from "./routes/Tipo.js"
import routerCategoria from "./routes/Categoria.js"
import routerUnidade from "./routes/Unidade.js"
import routerTrabalho from "./routes/Trabalho.js"

const app = express();
app.use(cors())
app.use(express.json());
app.use("/", routerAuth);
app.use("/tipo", routerTipo);
app.use("/categoria", routerCategoria);
app.use("/unidade", routerUnidade);
app.use("/trabalho", routerTrabalho);


// Iniciar o servidor
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
