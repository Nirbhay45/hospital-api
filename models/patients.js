const mongoose = require('mongoose');
const path = require('path');

// this is a schema for a patient's account
const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true
    },
    reports:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Report'
    }]
},{
    // maintains created at and updated at timestamp
    timestamps: true,
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;