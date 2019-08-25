const express = require("express");
const loginController = require("./controllers/loginController");
const registerController = require("./controllers/registerController");
const dashboardController = require("./controllers/dashboardController");

const routes = express.Router();

//Pagina inicial que liga aos formularios
routes.get("/", (req, res) => res.render("index"));
routes.get("/doador/", (req, res) => res.redirect('/doador/login'));
//Login e registro parte do doador
routes.get("/doador/login", loginController.renderDoador);
routes.post("/doador/login", loginController.storeDoador);
routes.post("/doador/register", registerController.storeDoador);

//Login e registro parte da ong

//Painel de controle do doador e ong
routes.get("/dashboard", dashboardController.render);

module.exports = routes;
