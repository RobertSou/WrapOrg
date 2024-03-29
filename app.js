require("dotenv").config();

const express = require("express");
const session = require("express-session");
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const fs = require('fs');

const privateKey = fs.readFileSync("localhost.key", "utf8");

const certificate = fs.readFileSync("localhost.cert", "utf8");

const credentials = { key: privateKey, cert: certificate };

const app = express();
const server = require('http').createServer(app);

// Passport config
require('./config/passport')(passport);

//DB CONFIG
const db = require('./config/keys').MongoURI;

//Connect Mongo
mongoose.connect(
    db.toString(), { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false 
    }, err => {
        if(err) console.log(err);
    });

//Routes
const routes = require("./src/routes");
    
app.set("view engine", "pug");

//Session
app.use(session({
    secret: 'XCR3rsasa%RDHHH', 
    resave: true, 
    saveUninitialized: true, 
    rolling: true,
    cookie: { maxAge: 80000 },
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash to send message when redirect
app.use(flash());

//Global vars
app.use((req, res, next) => {
    res.locals.sucess_msg = req.flash('sucess_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.cardError = req.flash('cardError');
    res.locals.cardSucess = req.flash('cardSucess');
    next();
});

app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/www"));
app.use("/js", express.static(__dirname + "/assets/js"));
app.use("/css", express.static(__dirname + "/assets/css/"));
app.use("/images", express.static(__dirname + "/assets/images/"));
app.use("/files", express.static(__dirname + "/tmp/uploads"));
app.use("/fonts", express.static(__dirname + "/assets/fonts/"));
app.use("/fa", express.static(__dirname + "/node_modules/@fortawesome/fontawesome-free/css"));
app.use("/webfonts", express.static(__dirname + "/node_modules/@fortawesome/fontawesome-free/webfonts"));

app.use(routes);

server.listen(process.env.PORT || 80, '0.0.0.0', () => {
    console.log(`App Started on PORT ${process.env.PORT || 80}`);
});
