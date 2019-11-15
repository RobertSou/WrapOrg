const { Schema, model } = require('mongoose');

const doacaoSchema = new Schema({
    donor: {
        type: Schema.Types.ObjectId,
        ref: 'donor',
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
    pendingToOng: {
        type: Boolean,
        required: true,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = model('donations', doacaoSchema);