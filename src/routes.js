const express = require("express");
const doadorController = require("./controllers/doadorController");
const dashboardController = require("./controllers/dashboardController");

const routes = express.Router();

//Pagina inicial que liga aos formularios
routes.get("/", (req, res) => res.render("index"));

//Login e registro parte do doador
routes.get("/doador", doadorController.renderDoador);
routes.post("/doador", doadorController.loginDoador);
//routes.post("/doador", doadorController.registerDoador);

//Painel de controle do doador e ong
routes.get("/dashboard", dashboardController.render);

module.exports = routes;
