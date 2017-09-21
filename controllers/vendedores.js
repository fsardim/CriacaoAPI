const express = require('express');
const VendedorSchema = require('../schemas/vendedor');
const passwordHash = require('password-hash');
const expressJwt = require('express-jwt');

let router = express.Router();

//criação de vendedores
router.post('/', (request, response) => {
    let vendedor = new VendedorSchema(request.body);
    vendedor.senha = passwordHash.generate(request.body.senha);
    vendedor.save((error, resultado) => {
        if(error) {
            response.status(400).send(error);
            return;
        }
        response.status(201).send(resultado);
    });
});

//exemplo de utilização de token dentro do método
router.get('/', expressJwt({secret: 'bolinhodechuva'}), (request, response) => {
    VendedorSchema.find((error, vendedores) => {
        if(error) {
            response.status(500).send(error);
            return;
        }
        response.status(200).send(vendedores);
    });
});

//Aplicando validação do token para todos as rotas abaixo
router.use(expressJwt({secret: 'bolinhodechuva'}));

router.get('/um/:id', (request, response) => {
    VendedorSchema.findById(request.params.id, (error, vendedor) => {
        if(vendedor) {
            response.send(vendedor);
            return;
        }
        response.sendStatus(404);
    });
});
router.get('/:nome', (request, response) => {
    const regex = new RegExp(request.params.nome, 'i');
    VendedorSchema.find({nome: regex}, (error, vendedores) => {
        if(vendedores) {
            response.send(vendedores);
            return;
        }
        response.sendStatus(404);
    });
});

module.exports = router;