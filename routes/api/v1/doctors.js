const express = require('express');
const router = express.Router();
const doctorApi = require('../../../controllers/api/v1/doctors_api');

// Api controllers 
router.post('/login', doctorApi.signin);
router.post('/register', doctorApi.register);

module.exports = router;