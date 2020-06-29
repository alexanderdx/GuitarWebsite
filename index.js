let express = require('express')
let bodyParser = require('body-parser');
let formidable = require('formidable');
let session = require('express-session');
let crypto = require('crypto');
let app = express();
let path = require('path');
let port = 3000;
var os = require('os');
var ifaces = os.networkInterfaces();



//Librarie necesara pentru a prelucra fisiere JSON
const fs = require('fs');

// exemple de pe pagina http://www.irinaciocan.ro/tehnici_web/lab12.php

// Citire BD
let rawdata = fs.readFileSync('data/database.json');
let userBD = JSON.parse(rawdata);

// Use this code as is. 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, access-control-allow-origin")
    next();
});

app.use(session({
    secret: 'Yamaha', //folosit de express session pentru criptarea id-ului de sesiune
    resave: true,
    saveUninitialized: false
}));


app.set('view engine', 'ejs');
app.set('trust proxy', true);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(path.join(__dirname, '../Site')));

function getIP() {
    let ip = "";
    Object.keys(ifaces).forEach(function(ifname) {
        var alias = 0;

        ifaces[ifname].forEach(function(iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }
            ip = iface.address;
        });
    });

    return ip;
}
// What you get if you go on the default route of the server. It's good to keep something here whether you use it or not.
app.get('/', function(req, res) {
    res.render('home.ejs', { root: __dirname, user: req.session.username, date: req.session.lastLoggedInDate, hour: req.session.lastLoggedInHour, numVisits: req.session.numOfVisits, userIP: req.session.ip });
});

app.post('/', function(req, res) {
    // res.send(req.body);
    // console.log(req.body, userBD, userBD.length, userBD[0]);
    let cifru = crypto.createCipher('aes-128-cbc', 'HarleyDavidson');

    console.log(req.body)
    let encrParola = cifru.update(req.body.password, 'utf8', 'hex');

    encrParola += cifru.final('hex');
    console.log("Encrypted Password: ", encrParola);

    userFound = {}
    for (let i = 0; i < userBD.length; i++) {
        if (userBD[i].email === req.body.email && userBD[i].password === encrParola) {
            userFound = userBD[i];
        }
        if (userFound.email) {
            req.session.loggedin = true;
            req.session.username = userBD[i].username; //setez userul ca proprietate a sesiunii
            req.session.email = userBD[i].email;
            req.session.numOfVisits = userBD[i].numOfVisits;
            req.session.lastLoggedInDate = userBD[i].lastLoggedInDate;
            req.session.lastLoggedInHour = userBD[i].lastLoggedInHour;
            req.session.ip = getIP();
        }
    }

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth())).slice(-2);
    let year = date_ob.getFullYear();
    let hours = ("0" + date_ob.getHours()).slice(-2);
    let minutes = ("0" + date_ob.getMinutes()).slice(-2);
    let seconds = ("0" + date_ob.getSeconds()).slice(-2);

    for (let i = 0; i < userBD.length; i++) {
        if (userBD[i].email === req.session.email) {
            console.log("Am gasit userul.")
            userBD[i].lastLoggedInDate = date + '.' + month + '.' + year;
            userBD[i].lastLoggedInHour = hours + ':' + minutes;
            let num = Number(userBD[i].numOfVisits);
            num += 1;
            userBD[i].numOfVisits = num.toString();
        }
    }

    fs.writeFileSync('data/database.json', JSON.stringify(userBD));
    res.render('home.ejs', { user: req.session.username, date: req.session.lastLoggedInDate, hour: req.session.lastLoggedInHour, numVisits: req.session.numOfVisits, userIP: req.session.ip });
    res.end();
})


app.post('/logout', function(req, res) {
    console.log(req.session.username, " has logged out.");
    req.session.destroy();
    res.redirect('/');
})

// In caz ca intrii pe o pagina care nu exista!
app.use(function(req, res) {
    // res.status(404).send({error: 'Not found'});
    res.status(404).render('404.ejs', { root: __dirname });
});

// Start the server
app.listen(port, () => {
    console.log(`Express.JS Server is running on http://localhost:${port}`)
});