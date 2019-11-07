const express = require("express");
const multer = require("multer");

const multerConfig = require("../config/multer");
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
routes.post("/doador/config/personalInfo", doadorController.editPersonal);
routes.post("/doador/config/doadorAddress", doadorController.editAddress);
routes.post("/doador/dashboard/donate", ensureAuthenticated, doadorController.makeDonation);

//ONG GET Methods
routes.get("/ong/", alredyLogged, (req, res) => res.redirect('/ong/login'));
routes.get("/ong/login", alredyLogged, ongController.renderOngLogin);
routes.get("/ong/registro", alredyLogged, ongController.renderOngRegistro);
routes.get("/ong/dashboard", ensureAuthenticated, ongController.renderDashboard);
routes.get("/ong/config", ensureAuthenticated, ongController.renderConfig);
//ONG POST Methods
routes.post("/ong/login", ongController.loginOng);
routes.post("/ong/registro", ongController.registerOng);
routes.post("/ong/config/saveBanner", ensureAuthenticated, multer(multerConfig).single('bannerImage'), ongController.saveBanner);
routes.post("/ong/config/saveLogo", ensureAuthenticated, multer(multerConfig).single('profileImage'), ongController.saveLogo);
routes.post("/ong/config/globalInfo", ensureAuthenticated, ongController.globalInfo);
routes.post("/ong/config/ongAddress", ensureAuthenticated, ongController.ongAddress);
routes.post("/ong/config/changeBanner1", ensureAuthenticated, multer(multerConfig).single('bannerInput1'), ongController.saveBanner1);
routes.post("/ong/config/changeBanner2", ensureAuthenticated, multer(multerConfig).single('bannerInput2'), ongController.saveBanner2);
routes.post("/ong/config/changeBanner3", ensureAuthenticated, multer(multerConfig).single('bannerInput3'), ongController.saveBanner3);

routes.get('/logout',(req,res) => {
    req.logout();
    //req.flash('sucess_msg', 'Deslogado com sucesso!');
    res.redirect('/');
})

module.exports = routes;