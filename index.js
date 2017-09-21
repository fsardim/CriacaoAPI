// Importando dependências
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const vendedoresController = require('./controllers/vendedores');
const loginController = require('./controllers/login');
const clientesController = require('./controllers/clientes');

// Gerar a aplicação
const app = express();

//Middlewares
app.use(bodyParser.json());
app.use('/vendedores', vendedoresController);
app.use('/login', loginController);
app.use('/clientes', clientesController);

//Conectar ao bd
mongoose.connect("mongodb://localhost/vendedor");

//servidor
app.listen(80, () => {
    console.log("Servidor rodando na porta 80");
})