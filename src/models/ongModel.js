const mongoose = require('mongoose');

const ongSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cnpj: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    publicInfo: {
        logo: String,
        capa: String,
        banner1: String,
        banner2: String,
        banner3: String,
        tel: Number,
        address: {
            state: String,
            city: String,
            street: String,
            cep: Number,
        },
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const ong = mongoose.model('ong', ongSchema);

module.exports = ong;