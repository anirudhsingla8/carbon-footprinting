const express = require('express');
const mongodb = require('mongodb');
const routes = require('./routes/index.js');
const session = require('client-sessions');
const app = express()
app.use(express.json())

//use sessions for tracking logins
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
}));

const DB_URI = 'mongodb+srv://anirudh:rj13sl1608@cluster0-lcda6.mongodb.net/test?retryWrites=true&w=majority';
const HOSTNAME = '127.0.0.1';
const PORT = '8080';

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


mongodb.MongoClient.connect(DB_URI, (error, dbClient) => {
    if(error) {
        console.log('error connecting to database', error)
        return
    }

    console.log('successfully connected to database instance');
    const database = dbClient.db('carbon-footprinting');
    routes(app,database);
    app.listen(PORT, HOSTNAME, () => {
        console.log(`Server started at http://${HOSTNAME}:${PORT} ......`);
    })

})
