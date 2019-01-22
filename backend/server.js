// Llamado de modulos
    const bodyParser = require('body-parser');
    const cors = require('cors');
    const nodemailer = require('nodemailer');   
    require('dotenv').config();
    const express = require('express');
// Inicializamos express
    var app = express();
// Levantando el servidor
    app.listen('3000',() =>{
        console.log('servidor iniciado');
    })
// Llamando a los middlewares
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(cors());
// Rutas
    // Home
        app.get('/',(req,res)=>{
            res.json({rs:'Bienvenido'});
        })
    // Enviar Email
        app.post('/enviar',(req,res)=>{
            var transporter = nodemailer.createTransport({
                service: process.env.SERVICE,
                auth: {
                  user: process.env.USER,
                  pass: process.env.PASSWORD
                }
            });
            var mailOptions = {
                from: process.env.USER,
                to: req.body.emailTo,
                subject: req.body.emailSubjet,
                text: req.body.emailText,
                html: `
                    <h1>Welcome</h1>
                    <h2>${req.body.emailText}</h2>
                    <a href="http://localhost:8080/">Entrar</a>
                `
            };
            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                // console.log(error);
                error.json({rs:'enviarEmailError'});
            } else {
                console.log(info);
            }
            });
            res.json({rs:'enviarEmailCorrecto'}); 
        })