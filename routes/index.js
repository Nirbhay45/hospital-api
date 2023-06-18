const express = require('express');
var router = express.Router();
console.log('Router loaded!');

// sub routing to api folder
router.use('/api', require('./api'));


module.exports = router;