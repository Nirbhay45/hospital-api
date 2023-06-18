const Patient = require('../../../models/patients');
const jwt = require('jsonwebtoken');
const STATUS_CODES = require('../../../constants/constants');
const REPORT_STATUS = require('../../../constants/report_status');
const Doctor = require('../../../models/doctors');
const Report = require('../../../models/reports');

//get the sign up data
module.exports.register = async function(req, res){
    try{
        // checking if patient is already registered
        let patient = await Patient.findOne({phone: req.body.phone});
        if(!patient){
            // if not present in db record then creating an account record
            await Patient.create(req.body);
            return res.status(STATUS_CODES.OK_CREATED).json({
                message:'Patient account created'
            });
        }else{
            // if present then returning the existing patient record
            return res.status(STATUS_CODES.OK).json({
                message:'Username already registered',
                patient_info: patient
            });
        }
    }catch(err){
        // error handling while handling the request for internal server error
        console.log('**********', err);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: 'INTERNAL SERVER ERROR'
        });
    }
}

module.exports.create_report = async function(req, res){
    try{
        // checking for patient record already present or not
        let patient = await Patient.findOne({phone: req.body.phone});
        if(!patient){
            // if record not present then responding that patient account record is not present please create an account first 
            return res.status(STATUS_CODES.UNPROCESSABLE_ENTITY).json({
                message: 'Patient not found, please create an account first'
            });
        }else{
            // checking if status is correctly given or not
            if(! REPORT_STATUS.includes(req.body.status)){
                return res.status(STATUS_CODES.BAD_REQUEST).json({
                    message: "BAD REQUEST: Status should be 'Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'"
                });
            }
            // getting the doctor information who is creating the record
            let doctor  = await Doctor.findById(req.params.id);

            // creating the record of the patient
            let report = await Report.create({
                createdFor:req.body.phone,
                createdBy: doctor.username,
                status: req.body.status,
                date: new Date()
            });
            // adding record to the patient's existing record
            patient.reports.push(report);
            // saving the changes made to patient's record
            patient.save();
            // responding with status of record created
            return res.status(STATUS_CODES.OK_CREATED).json({
                message: "Report created"
            });
        }
    }catch(err){
        // error handling while handling the request for internal server error
        console.log('**********', err);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: 'INTERNAL SERVER ERROR'
        });
    }
}

module.exports.all_reports = async function(req, res){
    try{
        // getting the record of patient and populating all his/her record.
        let patient = await Patient.findById(req.params.id)
        .populate('reports')
        .sort('date')
        .exec();


        if(!patient){
            // if patient record is not in db responding back UNPROCESSABLE_ENTITY
            return res.status(STATUS_CODES.UNPROCESSABLE_ENTITY).json({
                message: 'Patient not found'
            });
        }else{
            // if patient record is present in db responding with the records.
            return res.status(STATUS_CODES.OK).json({
                message: 'Here are the reports of the given patient: '+patient.name,
                reports: patient.reports,
            })
        }
    }catch(err){
        // error handling while handling the request for internal server error
        console.log('**********', err);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: 'INTERNAL SERVER ERROR'
        });
    }
}