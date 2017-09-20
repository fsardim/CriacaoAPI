const mongoose = require('mongoose');

//criação do Schema
const VendedorSchema = mongoose.model("Vendedor", {
    nome:{type: String, required: true},
    email: {type: String, required: true},
    telefone: {type: String, required: true},
    senha: {type: String, required: true}
});

module.exports = VendedorSchema;