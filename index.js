// Importando dependências
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const vendedoresController = require('./controllers/vendedores');
const loginController = require('./controllers/login');

// Gerar a aplicação
const app = express();

//Middlewares
app.use(bodyParser.json());
app.use('/vendedores', vendedoresController);
app.use('/login', loginController);

//Conectar ao bd
mongoose.connect("mongodb://localhost/vendedor");

//servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
})