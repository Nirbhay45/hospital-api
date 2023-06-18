const express = require('express');

const router = express.Router();


// Using versioning for apis to support different version of apis.
router.use('/v1', require('./v1'));


module.exports = router;