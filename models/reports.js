const mongoose = require('mongoose');
const path = require('path');

const reportSchema = new mongoose.Schema({
    createdFor:{
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    }
},{
    // maintains created at and updated at timestamp
    timestamps: true,
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;