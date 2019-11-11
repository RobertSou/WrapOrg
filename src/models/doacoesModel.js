const { Schema, model } = require('mongoose');

const doacaoSchema = new Schema({
    types: {
        type: Array,
        required: true,
    },
    quantidade: {
        type: String,
        required: true,
    },
    qualidade: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = model('doacoes', doacaoSchema);