const { Schema, model } = require('mongoose');

const doacaoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'doador',
        required: true,
    },
    types: {
        type: Array,
        required: true,
    },
    quality: {
        type: String,
        required: true,
    },
    qtd: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = model('donations', doacaoSchema);