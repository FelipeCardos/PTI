const passport = require('passport');
const passportJWT = require('passport-jwt');
const extractJWT = passportJWT.ExtractJwt;
const StrategyJwt = passportJWT.Strategy;
const {User} = require('../../database/models');


const cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) token = req.cookies["api-auth"];
    // if (req && req.signedCookies && req.signedCookies.jwt) {
    //   token = req.signedCookies["jwt"]["token"];
    // }
    return token;
    };

passport.use(
    new StrategyJwt({
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.JWT_SECRET1,
        maxAge: "7d",
        passReqToCallback: true,
    },
    async function (req, jwtPayload, done) {
        console.log("jwtPayload", jwtPayload);
        return User.findOne({ where: { id: jwtPayload.id } })
            .then(async (user) => {
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            })
            .catch((err) => {
                return done(err);
            });
        }));

