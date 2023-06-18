const mongoose = require('mongoose');
const path = require('path');


// This is the schema for a doctor account
const doctorSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true
    }
},{
    // maintains created at and updated at timestamp
    timestamps: true,
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;