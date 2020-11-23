const nodemailer = require('nodemailer');

class Email {

    constructor(config) {

        this.developer = "carteira_acoes@noreply.com";

        const host = config.email.host;
        const port = config.email.port;
        const user = config.email.auth.user;
        const pass = config.email.auth.pass;

        this.transporter = nodemailer.createTransport({
            host: host,
            port: port,
            auth: {
                user: user,
                pass: pass
            }
        })

    }

    sendPassword(destiny, newPassword) {

        this.transporter.sendMail({
            from: this.developer,
            to: destiny,
            subject: 'Recuperação de senha',
            html: `
                <center>
                  <h1 style="color: red;"> Utilize a senha abaixo para acessar o sistema! </h1>
                  <p> Sua nova senha é: <div style="border: 2px solid black;
                  width: fit-content; padding: 20px; background: rgb(54,54,54);
                  color: white; font-size: 25; letter-spacing: 5px;"> ${newPassword} </div> </p>
                </center>
            `
        },
        (error, info) => {

            if(error) {
                console.error(error);
                return;
            } else {
                console.log('Email sendo enviado enviado...');
                console.log(info);
            }
        });

    }

    sendCotacao(destiny, valorAcao, ticker) {
        const value = valorAcao.toLocaleString("pt-BR", {minimumFractionDigits: 2, maximumFractionDigits: 2 })
        this.transporter.sendMail({
            from: this.developer,
            to: destiny,
            subject: 'Aviso de Cotação',
            html: `
                <center>
                  <h1 style="color: red;"> Alerta! </h1>
                  <p> O valor da Ação ${ticker} atingiu o valor alvo de: <div style="border: 2px solid black;
                  width: fit-content; padding: 20px; background: rgb(54,54,54);
                  color: white; font-size: 25; letter-spacing: 5px;"> R$ ${value} </div> </p>
                </center>
            `
        },
        (error, info) => {

            if(error) {
                console.error(error);
                return;
            } else {
                console.log(info);
            }
        });

    }

}

module.exports = Email;