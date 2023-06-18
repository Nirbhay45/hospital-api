const Doctor = require('../../../models/doctors');
const jwt = require('jsonwebtoken');
const STATUS_CODES = require('../../../constants/constants');

//get the sign up data
module.exports.register = async function(req, res){
    try{
        if(req.body.password != req.body.confirm_password){        
            return res.status(STATUS_CODES.UNPROCESSABLE_ENTITY).json({
                message:'Password Not matching'
            });
        }
        let doctor = await Doctor.findOne({username: req.body.username});
        if(!doctor){
            await Doctor.create(req.body);
            return res.status(STATUS_CODES.OK_CREATED).json({
                message:'Doctor account created'
            });
        }else{
            return res.status(STATUS_CODES.UNPROCESSABLE_ENTITY).json({
                message:'Username already registered, try another username.'
            });
        }
    }catch(err){
        console.log('**********', err);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: 'Internal Server Error'
        });
    }
}
module.exports.signin = async function(req, res){
    try{
        let doctor = await Doctor.findOne({username: req.body.username});
        if(!doctor || doctor.password != req.body.password){
            res.status(STATUS_CODES.UNPROCESSABLE_ENTITY).json({
                message: 'Invalid username or password'
            })
        }else{
            res.status(STATUS_CODES.OK).json({
                message: 'Sign in successful, here is your token, please keep it safe.',
                data:{
                    token: jwt.sign(doctor.toJSON(),'hospital',{expiresIn: 1000000})
                }
            })
        }
    }catch(err){
        console.log('**********', err);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: 'Internal Server Error'
        });
    }

}