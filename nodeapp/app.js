var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var Promise = require('bluebird');

var port = process.env.PORT || 8080;
app.set('superSecret', config.secret);

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

var OrientDB = require('orientjs');

var server = OrientDB({
    host: 'localhost',
    port: 2424,
    username: 'putUsernemeHere',
    password: 'putPasswordHere'
});

var db = server.use('putitontest');

app.get('/', function (req, res) {
    res.send('API at /api v.0.0.3');
});

var apiRoutes = express.Router();
require('./routes')(app.get('superSecret'), apiRoutes, db);
app.use('/api', apiRoutes);


//Exit
process.on('SIGTERM', function () {
    app.close();
});

app.on('close', function () {
    db.close();
});

app.listen(port);
console.log('running on port = ' + port);
