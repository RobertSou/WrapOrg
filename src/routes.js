const express = require("express");
const doadorController = require("./controllers/doadorController");
const ongController = require("./controllers/ongController");
const { ensureAuthenticated, alredyLogged } = require('../config/auth');

const routes = express.Router();

//Pagina inicial que liga aos formularios
routes.get("/", alredyLogged, (req, res) => res.render('index'));

//DOADOR GET Methods
routes.get("/doador/", alredyLogged, (req, res) => res.redirect('/doador/login'));
routes.get("/doador/login", alredyLogged, doadorController.renderDoadorLogin);
routes.get("/doador/registro", alredyLogged, doadorController.renderDoadorRegistro);
routes.get("/doador/dashboard", ensureAuthenticated, doadorController.renderDashboard);
routes.get("/doador/config", ensureAuthenticated, doadorController.renderConfig);
//DOADOR POST Methods
routes.post("/doador/login", doadorController.loginDoador);
routes.post("/doador/registro", doadorController.registerDoador);
routes.post("/doador/config", doadorController.saveConfigs);


//Login e registro parte da ong
routes.get("/ong/", alredyLogged, (req, res) => res.redirect('/ong/login'));
routes.get("/ong/login", alredyLogged, ongController.renderOngLogin);
routes.get("/ong/registro", alredyLogged, ongController.renderOngRegistro);
routes.post("/ong/login", ongController.loginOng);
routes.post("/ong/registro", ongController.registerOng);
routes.get("/ong/dashboard", ensureAuthenticated, ongController.renderDashboard);

routes.get('/logout',(req,res) => {
    req.logout();
    //req.flash('sucess_msg', 'Deslogado com sucesso!');
    res.redirect('/');
})

module.exports = routes;