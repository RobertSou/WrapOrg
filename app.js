require("dotenv").config();

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const FirebaseStore = require('connect-session-firebase')(session);
const firebaseAdm = require('firebase-admin');

const app = express();

const routes = require("./src/routes");
let serviceAccount = require("./serviceAccountKey.json");

const ref = firebaseAdm.initializeApp({
    credential: firebaseAdm.credential.cert(serviceAccount),
    databaseURL: 'https://wraporg-ff176.firebaseio.com'
});

session({
    store: new FirebaseStore({
        database: ref.database()
    }),
    secret: 'XCR3rsasa%RDHHH', 
    resave: true, 
    saveUninitialized: true, 
    cookie: { maxAge: 60000 },
});

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static(__dirname + "/www"));
app.use("/js", express.static(__dirname + "/assets/js"));
app.use("/css", express.static(__dirname + "/assets/css/"));
app.use("/images", express.static(__dirname + "/assets/images/"));

app.set("view engine", "pug");

app.use(routes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`App Started on PORT ${process.env.PORT || 3000}`);
});