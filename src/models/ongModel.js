const { Schema, model } = require('mongoose');

const ongSchema = new Schema({
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
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    pendingDonations: [{
        type: Schema.Types.ObjectId,
        ref: 'donations',
        required: false,
    }],
    publicInfo: {
        logo: {
            name: String,
            size: Number,
            key: String,
            url: {
                type: String,
                default: `${process.env.servidorURI}/images/logoModel.svg`,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
        capa: {
            name: String,
            size: Number,
            key: String,
            url: {
                type: String,
                default: `${process.env.servidorURI}/images/bannerModel.svg`,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
        banner1: {
            name: String,
            size: Number,
            key: String,
            url: {
                type: String,
                default: `${process.env.servidorURI}/images/modelbanner.png`,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
        banner2: {
            name: String,
            size: Number,
            key: String,
            url: {
                type: String,
                default: `${process.env.appURI}/images/modelbanner.png`,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
        banner3: {
            name: String,
            size: Number,
            key: String,
            url: {
                type: String,
                default: `${process.env.appURI}/images/modelbanner.png`,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
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

const ong = model('ong', ongSchema);

module.exports = ong;