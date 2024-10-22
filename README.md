# Magic Link Authentication System

Este projeto implementa um sistema de autenticação sem senha usando Magic Links. Abaixo está uma breve descrição do código, incluindo como configurar e usar o sistema de envio de e-mails para autenticação via Magic Link.

## Configuração

Antes de iniciar, você precisará configurar variáveis de ambiente para o serviço de e-mail (usando Gmail como exemplo) e o JWT Secret:

- `EMAIL_USER`: O e-mail que será utilizado para enviar os Magic Links.
- `EMAIL_PASS`: A senha do e-mail.
- `JWT_SECRET`: A chave secreta usada para assinar e verificar os tokens JWT.
- `WEBSITE`: A URL do seu site para geração do Magic Link.

## Código

```javascript
// Importar as dependências necessárias
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const pool = require('./database'); // Supondo que 'pool' seja a conexão com o banco de dados

// Configurar o serviço de e-mail (usando Gmail como exemplo)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,   // Definir o e-mail de envio
      pass: process.env.EMAIL_PASS,   // Definir a senha do e-mail
    },
    tls: {
        rejectUnauthorized: false,   // Desativar verificação de certificado autoassinado
    },
});
```

## Enviar Magic Link via e-mail para o usuário

``` javascript
export const submeterEmail = async (req, res) => {
    const { email } = req.body;

    // Verifica se o campo de e-mail foi enviado
    if (!email) {
      return res.status(400).send('Email é obrigatório');
    }

    // Consulta o banco de dados para verificar se o e-mail existe
    const [rows] = await pool.query("select * from usuario where email = ?", [email]);

    if(rows.length > 0) {
        const user = rows[0].nome;

        // Gerar um token JWT com expiração de 15 minutos
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '15m' });

        // Gera a URL com o token JWT como parâmetro
        const magicLink = `${process.env.WEBSITE}/${token}/${user}`;

        // Configura os detalhes do e-mail a ser enviado
        const mailOptions = {
            from: `CDCU <${process.env.EMAIL_USER}>`,  // Definir remetente
            to: email,                                // Enviar para o usuário
            subject: 'Seu Magic Link para Login',     // Assunto do e-mail
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

        // Log do Magic Link no servidor (para debug)
        console.log("MagicLink: ", magicLink);

        // Enviar o e-mail com o Magic Link
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Erro ao enviar o e-mail');
            } else {
                return res.status(200).send('Magic Link enviado para seu e-mail!');
            }
        });
    } else {
        return res.status(500).send('E-mail não encontrado');
    }
};
```

## Autenticar o usuário com o Magic Link
```javascript	
export const autenticarToken = async (req, res) => {
    const { token, user } = req.params;

    // Verifica no banco de dados se o usuário existe
    const [rows] = await pool.query("select * from usuario where nome = ?", [user]);

    if(rows.length > 0) {
        // Verifica e valida o token JWT
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(400).send('Link inválido ou expirado');
            } else {
                return res.json(rows);  // Retorna os dados do usuário
            }
        });
    } else {
        return res.status(400).send("Usuário não encontrado");
    }
};
```
