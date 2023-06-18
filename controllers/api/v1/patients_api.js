const Patient = require('../../../models/patients');
const jwt = require('jsonwebtoken');
const STATUS_CODES = require('../../../constants/constants');
const REPORT_STATUS = require('../../../constants/report_status');
const Doctor = require('../../../models/doctors');
const Report = require('../../../models/reports');

//get the sign up data
module.exports.register = async function(req, res){
    try{
        let patient = await Patient.findOne({phone: req.body.phone});
        if(!patient){
            await Patient.create(req.body);
            return res.status(STATUS_CODES.OK_CREATED).json({
                message:'Patient account created'
            });
        }else{
            return res.status(STATUS_CODES.OK).json({
                message:'Username already registered',
                patient_info: patient
            });
        }
    }catch(err){
        console.log('**********', err);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: 'INTERNAL SERVER ERROR'
        });
    }
}

module.exports.create_report = async function(req, res){
    try{
        let patient = await Patient.findOne({phone: req.body.phone});
        if(!patient){
            return res.status(STATUS_CODES.UNPROCESSABLE_ENTITY).json({
                message: 'Patient not found'
            });
        }else{
            if(! REPORT_STATUS.includes(req.body.status)){
                return res.status(STATUS_CODES.BAD_REQUEST).json({
                    message: "BAD REQUEST: Status should be 'Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'"
                });
            }
            let doctor  = await Doctor.findById(req.params.id);
            let report = await Report.create({
                createdFor:req.body.phone,
                createdBy: doctor.username,
                status: req.body.status,
                date: new Date()
            });
            patient.reports.push(report);
            patient.save();
            return res.status(STATUS_CODES.OK_CREATED).json({
                message: "Report created"
            });
        }
    }catch(err){
        console.log('**********', err);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: 'INTERNAL SERVER ERROR'
        });
    }
}

module.exports.all_reports = async function(req, res){
    try{
        let patient = await Patient.findById(req.params.id)
        .populate('reports')
        .sort('date')
        .exec();


        if(!patient){
            return res.status(STATUS_CODES.UNPROCESSABLE_ENTITY).json({
                message: 'Patient not found'
            });
        }else{
            return res.status(STATUS_CODES.OK).json({
                message: 'Here are the reports of the given patient: '+patient.name,
                reports: patient.reports,
            })
        }
    }catch(err){
        console.log('**********', err);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: 'INTERNAL SERVER ERROR'
        });
    }
}