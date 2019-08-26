require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
//const pug = require("pug");
const routes = require("./src/routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static(__dirname + "/www"));
app.use("/js", express.static(__dirname + "/assets/js"));
app.use("/css", express.static(__dirname + "/assets/css/"));
app.use("/images", express.static(__dirname + "/assets/images/"));

app.set("view engine", "pug");

app.use(routes);

app.listen(3000);
