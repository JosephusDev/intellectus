import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import {pool} from "../config/database.js";

export const cadastro = async (req, res) => {
    const { nome, email } = req.body;
  
    if (!nome || !email) {
      return res.status(400).json({ message: 'Informe todos os dados.' });
    }
  
    try {
  
      await pool.query('INSERT INTO usuario (nome, email) VALUES (?, ?)', [nome, email]);
  
      res.status(201).json({ message: 'Efectuado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Database error', error });
    }
  };


// Configurar o serviço de e-mail (usando Gmail como exemplo)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false, // Desativa a verificação do certificado autoassinado
    },
  });

export const submeterEmail = async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send('Email e usuário são obrigatórios');
    }

    const [rows] = await pool.query("select * from usuario where email = ?", [email])

    if(rows.length > 0) {

        const user = rows[0].nome

        // Gerar um token JWT
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '15m' });
    
        // URL com o token JWT como parâmetro
        const magicLink = `${process.env.WEBSITE}/${token}/${user}`;
    
        // Enviar o e-mail com o link
        const mailOptions = {
            from: `CDCU <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Seu Magic Link para Login',
            html: `
                    <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
                    <h2 style="color: #361362;">Bem-vindo ao Intellectus!</h2>
                    <p>Para acessar sua conta, clique no botão abaixo:</p>
                    <a href="${magicLink}" style="display: inline-block; background-color: #361362; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Acessar Conta</a>
                    <p style="margin-top: 20px;">Se você não solicitou este e-mail, por favor ignore.</p>
                    <p style="color: #777; font-size: 12px;">Este link é válido por 15 minutos.</p>
                    </div>
                `,
        };

        console.log("MagicLink: ", magicLink)
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Erro ao enviar o e-mail');
            } else {
                return res.status(200).send('Magic Link enviado para seu e-mail!');
            }
        });
    }else{
        return res.status(500).send('e-mail não encontrado');
    }
  }

export const autenticarToken = async (req, res) => {
    const { token, user } = req.params;

    const [rows] = await pool.query("select * from usuario where nome = ?", [user])

    if(rows.length > 0) {
        // Verificar e validar o token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(400).send('Link inválido ou expirado');
            } else {
                return res.json(rows);
            }
        });
    }else{
        return res.status(400).send("Usuário não encontrado")
    }
  }