const jwt = require('jsonwebtoken');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const dotenv = require('dotenv');

//Initialize dotenv
dotenv.config();
const SECRET = process.env.JWT_SECRET;

//Passport options
const passportOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET
};

//Initializing passport and session
const passportInit = passport.initialize();
const passportSess = passport.session();

//Passport Strategy
passport.use(new JwtStrategy(passportOpts, function (jwtPayload, done) {
  const expirationDate = new Date(jwtPayload.exp * 1000);
  if (expirationDate < new Date()) {
    return done(null, false);
  }
  done(null, jwtPayload);
}));

//Passport Session
passport.serializeUser(function (user, done) {
  done(null, user.email)
});

//JWT Signing 
const jwtSiging = (user) => {
  return jwt.sign(user, SECRET, {expiresIn: 600});
}

//Passport Authentication Middleware
const passportAuth = passport.authenticate('jwt');

module.exports.passportInit = passportInit;
module.exports.passportSess = passportSess;
module.exports.jwtSiging = jwtSiging;
module.exports.passportAuth = passportAuth;