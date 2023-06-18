// importing modules

const express = require('express');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');

// Declaring constants
const PORT = 8000;

// CONFIGURING MONGOOSE
const db = require('./config/mongoose');

// INITIATING EXPRESS
const app = express();

// MIDDLEWARE FOR URL ENCODING
app.use(express.urlencoded());


app.use(passport.initialize());
//app.use(passport.setAuthenticatedUser);

// USE EXPRESS ROUTES
app.use('/', require('./routes'));

app.listen(PORT,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server is up and running on port ${PORT}`);
    console.log(`Visit 127.0.0.1:${PORT}`);
});