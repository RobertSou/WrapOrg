const mongoose = require('mongoose');

const doacaoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    quantidade: {
        type: Number,
        required: true,
    },
    endereco: {
        type: String,
        required: true,
    },
    telefone: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const doacoes = mongoose.model('doacoes', doacaoSchema);

module.exports = doacoes;