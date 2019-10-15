const mongoose = require('mongoose');

const doadorSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    cpf: {
        type: Number,
        required: true,
    },
    connectInfo: {
        tel: Number,
        address: {
            city: String,
            state: String,
            street: String,
            cep: Number
        }
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const doador = mongoose.model('doador', doadorSchema);

module.exports = doador;