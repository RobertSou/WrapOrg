const express = require("express");
const doadorController = require("./controllers/doadorController");
const ongController = require("./controllers/ongController");
const dashboardController = require("./controllers/dashboardController");
const { ensureAuthenticated, alredyLogged } = require('../config/auth');

const routes = express.Router();

//Pagina inicial que liga aos formularios
routes.get("/", alredyLogged, (req, res) => res.render('index'));

//Login e registro parte do doador
routes.get("/doador/", alredyLogged, (req, res) => res.redirect('/doador/login'));
routes.get("/doador/login", alredyLogged, doadorController.renderDoadorLogin);
routes.get("/doador/registro", alredyLogged, doadorController.renderDoadorRegistro);
routes.post("/doador/login", doadorController.loginDoador);
routes.post("/doador/registro", doadorController.registerDoador);


//Login e registro parte da ong
routes.get("/ong/", alredyLogged, (req, res) => res.redirect('/ong/login'));
routes.get("/ong/login", alredyLogged, ongController.renderOngLogin);
routes.get("/ong/registro", alredyLogged, ongController.renderOngRegistro);
routes.post("/ong/login", ongController.loginOng);
routes.post("/ong/registro", ongController.registerOng);

//Painel de controle do doador e ong
routes.get("/dashboard", ensureAuthenticated, dashboardController.render);

routes.get('/logout',(req,res) => {
    req.logout();
    //req.flash('sucess_msg', 'Deslogado com sucesso!');
    res.redirect('/');
})

module.exports = routes;