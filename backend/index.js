const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
require('dotenv').config();

const app = express();

// CORS middleware
app.use(cors());
app.use((req, res, next) => {
    // Replace '*' with your specific domain(s) if needed
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE'
    );
    next();
});

// bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// UserRoute
const UserRoute = require('./routes/UserRoute');
app.use('/api', UserRoute);


// This sends the response "Hello, world!" to the browser
app.get('/', (req, res) => {
    res.send('Hello World, from BACKEND!');
});


app.set('port', process.env.PORT || 5000);


// mongoose Connection
mongoose
    .connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('*****DATABASE CONNECTED*****');
        const server = http.createServer(app);
        server.listen(app.get('port'), () => {
            console.log(`Server Running at ${process.env.HOST}`);
        });
    })
    .catch((err) => console.error(err));