const express = require('express');
const router = express.Router();
const reportsApi = require('../../../controllers/api/v1/reports_api');

// Api controllers 
router.post('/:status', reportsApi.status);

module.exports = router;