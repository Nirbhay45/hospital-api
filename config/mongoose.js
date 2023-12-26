// require the library
const mongoose = require('mongoose');


// url to mongo atlas 
const url= 'use your url 😉';
mongoose.url = url;
//connect to db
mongoose.connect(url);

//aquire the connection (to check if it is successful)
const db = mongoose.connection;

// Print error if error
db.on('error', console.error.bind(console, 'error connecting to db.\n\n\n\nCheck Internet Connection.\n\n\n\n'));

// un and running then print the message
db.once('open',function(){
    console.log("Successfully connected to the mongodb database");
});

module.exports = db;
