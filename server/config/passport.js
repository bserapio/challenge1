// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
// load the auth variables
//var configAuth = require('./auth'); // use this one for testing

module.exports = function(passport) {
    var userModel=null;
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        return done(null,id);
        console.log(id)
        userModel.findById(id).then(user=> {
            if (!user) {
                return done(null,false)
            }
            return done(null,user)
        });

    });



    passport.use('local-login', new LocalStrategy(
        {
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback: true,
            session: true
        },
        function(req, username, password, done) {
            console.log(username)
            userModel = req.model.User;
            userModel.findOne({ where:{ 'username' :  username } }).then(user => {

                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                } else {
                    return done(null, user) ;
                }
            });
        }));
};