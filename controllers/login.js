const express = require('express');
const VendedorSchema = require('../schemas/vendedor');
let router = express.Router();

router.post('/', (request, response) => {
    VendedorSchema.findOne(request.body, (error, vendedor) => {
        if(vendedor) {
            response.status(200).send(vendedor);
            return;
        }
        response.sendStatus(403);
    });
});

module.exports = router;