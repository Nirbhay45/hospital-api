const express = require('express');
var router = express.Router();
console.log('Router loaded!');


router.use('/api', require('./api'));

//for any other routes, access from here.
//router.use('/routername', require('./routerfile'));

module.exports = router;