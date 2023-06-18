const jwt = require('jsonwebtoken');
const STATUS_CODES = require('../../../constants/constants');
const Report = require('../../../models/reports');
const REPORT_STATUS = require('../../../constants/report_status');


module.exports.status = async function(req, res){
    try{

        if(! REPORT_STATUS.includes(req.params.status)){
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                message: "BAD REQUEST: Status should be 'Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'"
            });
        }
        let report_status_list  = await Report.find({status: req.params.status});
        if(!report_status_list){
            return res.status(STATUS_CODES.UNPROCESSABLE_ENTITY).json({
                message: 'No reports found',
            })
        }else{
            return res.status(STATUS_CODES.OK).json({
                message: 'Reports group by Status: '+req.params.status,
                reports: report_status_list
            });
        }
    }catch(err){
        console.log('**********', err);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: 'INTERNAL SERVER ERROR'
        });
    }
}
