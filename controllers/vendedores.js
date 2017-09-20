const express = require('express');
const VendedorSchema = require('../schemas/vendedor');
let router = express.Router();

router.get('/', (request, response) => {
    VendedorSchema.find((error, vendedores) => {
        if(error) {
            response.status(500).send(error);
            return;
        }
        response.status(200).send(vendedores);
    })
});
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
router.post('/', (request, response) => {
    let vendedor = new VendedorSchema(request.body);
    vendedor.save((error, resultado) => {
        if(error) {
            response.status(400).send(error);
            return;
        }
        response.status(201).send(resultado);
    });
});

module.exports = router;