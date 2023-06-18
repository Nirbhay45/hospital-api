const Doctor = require('../../../models/doctors');
const jwt = require('jsonwebtoken');
const STATUS_CODES = require('../../../constants/constants');

//get the sign up data
module.exports.register = async function(req, res){
    try{
        // checking if password and confirm password matches
        if(req.body.password != req.body.confirm_password){        
            return res.status(STATUS_CODES.UNPROCESSABLE_ENTITY).json({
                message:'Password Not matching'
            });
        }

        // checking for availability of username
        let doctor = await Doctor.findOne({username: req.body.username});
        if(!doctor){
            // if username is available creating an account and responding
            await Doctor.create(req.body);
            return res.status(STATUS_CODES.OK_CREATED).json({
                message:'Doctor account created'
            });
        }else{
            // if username is already present in db record then telling to try anotherusername
            return res.status(STATUS_CODES.UNPROCESSABLE_ENTITY).json({
                message:'Username already registered, try another username.'
            });
        }
    }catch(err){
        // error handling while handling the request for internal server error
        console.log('**********', err);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: 'Internal Server Error'
        });
    }
}

// logic for signing in the doctor
module.exports.signin = async function(req, res){
    try{
        // checking for presence of doctor record in database
        let doctor = await Doctor.findOne({username: req.body.username});
        // handling if doctor record is not present in database or the password is not matching
        if(!doctor || doctor.password != req.body.password){
            res.status(STATUS_CODES.UNPROCESSABLE_ENTITY).json({
                message: 'Invalid username or password'
            })
        }else{
            // If doctor record is present responding with the token
            res.status(STATUS_CODES.OK).json({
                message: 'Sign in successful, here is your token, please keep it safe.',
                data:{
                    token: jwt.sign(doctor.toJSON(),'hospital',{expiresIn: 1000000})
                }
            })
        }
    }catch(err){
        // error handling while handling the request for internal server error
        console.log('**********', err);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: 'Internal Server Error'
        });
    }

}