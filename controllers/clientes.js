const express = require('express');
const VendedorSchema = require('../schemas/vendedor');
const ClienteSchema = require('../schemas/cliente');
const passwordHash = require('password-hash');
const expressJwt = require('express-jwt');

let router = express.Router();

//Aplicando validação do token para todos as rotas abaixo
router.use(expressJwt({secret: 'bolinhodechuva'}));

//criação de clientes, atrelados a um vendedor
router.post('/', (request, response) => {
    let cliente = new ClienteSchema(request.body);
    cliente.vendedor = request.user._id;

    cliente.save((error, resultado) => {
        if(error){
            response.status(400).send(error);
            return;
        }
        response.status(201).send(resultado);
    });
});

//consulta de todos os clientes atrelados a um vendedor
router.get('/', (request, response) => {
    const query = {
        vendedor: request.user._id
    };
    
    ClienteSchema.find(query, (error, clientes) => {
        if(error) {
            response.status(500).send(error);
            return;
        }
        response.status(200).send(clientes);
    });
});

module.exports = router;