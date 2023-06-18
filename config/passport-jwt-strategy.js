const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;

const ExtractJWT = require('passport-jwt').ExtractJwt;

const Doctor = require('../models/doctors');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'hospital' // Encryption key,
}


passport.use(new JWTStrategy(opts, async function(jwtPayload, done){
    let user = await Doctor.findById(jwtPayload._id);
    if(!user){
        console.log('Error in finding doctor from JWT');
        return;
    }
    if(user){
        return done(null, user);
    }else{
        return done(null, false);
    }
    })
);

module.exports = passport;