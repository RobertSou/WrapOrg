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
        logo: {
            name: String,
            size: Number,
            key: String,
            url: {
                type: String,
                default: `${process.env.appURI}/images/logoModel.svg`,
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
                default: `${process.env.appURI}/images/bannerModel.svg`,
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
                default: `${process.env.appURI}/images/modelbanner.png`,
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

const ong = mongoose.model('ong', ongSchema);

module.exports = ong;