const { Schema, model } = require('mongoose');

const doadorSchema = new Schema({
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
    donations: [{
        type: Schema.Types.ObjectId,
        ref: 'doador'
    }],
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

module.exports = model('doador', doadorSchema);