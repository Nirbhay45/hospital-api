const express = require('express');
const router = express.Router();
const patientApi = require('../../../controllers/api/v1/patients_api');
const passport = require('passport');

// Api controllers 
router.post('/register', patientApi.register);
router.post('/:id/create_report', passport.authenticate('jwt', {session: false}), patientApi.create_report);
router.post('/:id/all_reports', patientApi.all_reports);

module.exports = router;