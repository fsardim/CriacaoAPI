const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//criação do Schema
const ClienteSchema = mongoose.model("Cliente", {
    nome:{type: String, required: true},
    email: {type: String, required: true},
    telefone: String,
    vendedor: {type: Schema.ObjectId, required: true}
});

module.exports = ClienteSchema;