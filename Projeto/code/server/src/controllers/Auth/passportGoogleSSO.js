const passport = require('passport');
const passportGoogleSSO = require('passport-google-oauth20');
const {User, Credentials} = require('../../database/models');
const { FindCredential } = require('./credentials');
const { cpSync } = require('fs');

passport.use(new passportGoogleSSO({
    clientID: process.env.GOOGLEAUTH_CLIENT_ID ,
    clientSecret: process.env.GOOGLEAUTH_SECRET,
    callbackURL: process.env.GOOGLEAUTH_CALLBACK,
    passReqToCallback: true,

}, async (req, accessToken, refreshToken, profile, cb) => {
    const credentials = await FindCredential(profile.id).catch((err) => {
        console.log("Error signing up",err);
        cb(err, null);
    });
    if (credentials != null) {
        console.log("User already exists");
        const user = await User.findOne( { where: { id: credentials.user_id } } ).catch((err) => {
            console.log("Error deserializing user",err);
            cb(err, user);
        });
        cb(null,  user);
    } else {
        if (req.typeUser == "Producer") { 
            await User.create({name: profile.displayName, email: profile.emails[0].value, typeUser: req.typeUser}).catch((err) => {
                console.log("Error signing up",err);
                cb(err, null);
            }).then((user) => {
                console.log("User created", user);
                Credentials.create({value: profile.id, user_id: user.id, provider:"Google"}).catch((err) => {
                    console.log("Error signing up",err);
                    cb(err, null);
                }).then((credentials) => {
                    console.log("Credentials created", credentials);
                    cb(null, user);
                });
            });      
        } else {
            await User.create({name: profile.displayName, email: profile.emails[0].value, typeUser:"Consumer"}).catch((err) => {
                console.log("Error signing up",err);
                cb(err, null);
            }).then((user) => {
                console.log("User created", user);
                Credentials.create({value: profile.id, user_id: user.id, provider:"Google"}).catch((err) => {
                    console.log("Error signing up",err);
                    cb(err, null);
                }).then((credentials) => {
                    console.log("Credentials created", credentials);
                    cb(null, user);
                });
            });
        }   
    }
}));

passport.serializeUser((user, cb) => {
    console.log("serializeUser", user);
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    const user = User.findOne( { where: { id: id }, attributes: { exclude: ['password'] } } ).catch((err) => {
        console.log("Error deserializing user",err);
        cb(err, null);
    }).then((user) => {
        if (user) cb(null, user);
    });
});

