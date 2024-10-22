import {pool} from "../config/database.js";

export const carregar = async (req, res) => {
    try {
        const [rows] = await pool.query("select * from ver_trabalhos order by titulo");
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({message: "Erro ao conectar com o Banco de dados: " + error.message});
    }
}

export const cadastrar = async (req, res) => {
    const {titulo, autores, resumo, palavras_chaves, documento_url, id_unidade, usuario, id_categoria, id_tipo} = req.body;
    if(!titulo || !autores || !resumo || !palavras_chaves || !documento_url || !id_unidade || !usuario || !id_categoria || !id_tipo) {
        return res.status(400).json({message: 'Informe todos os dados'})
    }
    try {
        await pool.query("insert into trabalho(titulo, autores, resumo, palavras_chaves, data_publicacao, documento_url, id_unidade, id_usuario, id_categoria, id_tipo) values(?, ?, ?, ?, date(now()), ?, ?, (select id from usuario where nome = ?), ?, ?)",
            [titulo, autores, resumo, palavras_chaves, documento_url, id_unidade, usuario, id_categoria, id_tipo]
        )
        res.status(200).json({message: "Cadastrado com sucesso!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Erro ao conectar com o Banco de dados"})
    }
}

export const eliminar = async (req, res) => {
    const id = req.params.id;
    try {
        await pool.query("delete from trabalho where id = ?", [id])
        res.status(200).json({message: "Eliminado com sucesso!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Erro ao conectar com o Banco de dados"})
    }
}

export const alterarStatus = async (req, res) => {
    try {
        await pool.query("update trabalho set status = ? where id = ?", [
            req.body.status,
            req.params.id
        ])
        res.status(200).json({message:"Status alterado com sucesso!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Erro ao conectar com o Banco de dados"})
    }
}