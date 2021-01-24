'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars');
const crypto = require('crypto');

const port = 3000;

const app = express();
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))

// Middleware for setting conf with random nonce
app.use( (req, res, next) => {
    res.locals.conf = {
        'tenant': '<INSERT TENANT>',
        'client_id': '<INSERT CLIENT ID>',
        'redirect_uri': 'http://localhost:3000',
        'nonce': crypto.randomInt(65536)
    };
    next();
});

app.get('/', (req,res) => {
    res.render('home', res.locals.conf );
});

app.post('/', (req,res) => {
    res.locals.conf['id_token'] = req.body.id_token;
    res.locals.conf['access_token'] = req.body.access_token;
    res.render('home', res.locals.conf );
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});