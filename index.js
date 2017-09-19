// Importando dependências
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Gerar a aplicação
const app = express();

//Middlewares
app.use(bodyParser.json());

//Conectar ao bd
mongoose.connect("mongodb://localhost/vendedor");

//criação do Schema
const VendedorSchema = mongoose.model("Vendedor", {
    nome:{type: String, required: true},
    email: {type: String, required: true},
    telefone: {type: String, required: true},
    senha: {type: String, required: true}
});

let dados = {
    teste: "xpto",
    teste2: "xpto2"
}

//rotas
app.get('/', (request, response) => {
    response.send(dados);
});
app.get('/vendedores', (request, response) => {
    VendedorSchema.find((error, vendedores) => {
        if(error) {
            response.status(500).send(error);
            return;
        }
        response.status(200).send(vendedores);
    })
});
app.post('/vendedores', (request, response) => {
    let vendedor = new VendedorSchema(request.body);
    vendedor.save((error, resultado) => {
        if(error) {
            response.status(400).send(error);
            return;
        }
        response.status(201).send(resultado);
    });
});
app.post('/login', (request, response) => {
    VendedorSchema.findOne(request.body, (error, vendedor) => {
        if(vendedor) {
            console.log(vendedor);
            response.status(200).send(vendedor);
            return;
        }
        response.sendStatus(400);
    });
});

//servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
})