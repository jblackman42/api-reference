const express = require('express');
const app = express();
var session = require('express-session');

//middleware
app.use(express.json());
require('dotenv').config();

app.use(express.json({ limit: '16MB' }));
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1) // trust first proxy

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use("/styles",express.static(__dirname + "/views/styles"));
app.use("/scripts",express.static(__dirname + "/views/scripts"));
app.use("/assets",express.static(__dirname + "/views/assets"));

const port = process.env.PORT || 3000;

//navigation routing
app.use('/', require('./routes/index'));
app.use('/api/auth', require('./routes/auth'));

const start = async () => {
    try {
        app.listen(port, console.log(`\n server is listening on port ${port}, http://localhost:${port}`));
    } catch (error) { console.log(error) }
}
start();