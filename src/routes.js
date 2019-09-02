const express = require("express");
const doadorController = require("./controllers/doadorController");
const dashboardController = require("./controllers/dashboardController");

const routes = express.Router();

//Pagina inicial que liga aos formularios
routes.get("/", (req, res) => res.render('index'));

//Login e registro parte do doador
routes.get("/doador", doadorController.renderDoador);
routes.get("/doador/login", doadorController.renderDoador);
routes.get("/doador/register", doadorController.renderDoador);
routes.post("/doador/login", doadorController.loginDoador);
routes.post("/doador/register", doadorController.registerDoador);

//Painel de controle do doador e ong
routes.get("/dashboard", dashboardController.render);

routes.get('/logout',(req,res) => {
    req.session.destroy(err => {
        if(err) return console.log(err);
        res.redirect('/');
    });
});

module.exports = routes;
