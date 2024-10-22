import { pool } from "../config/database.js";

export const carregar = async (req, res) => {
    const [rows] = await pool.query("select * from categoria order by nome")
    if(rows.length > 0) {
        return res.json(rows);
    }
    return res.status(400).send("Nenhuma categoria encontrada.")
}