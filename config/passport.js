// load all the things we need
const LocalStrategy = require('passport-local').Strategy;
const db = require('../server/db/models/index');

const User = db.User;

module.exports = function (passport) {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser((id, done) => {
        User.findById(id).then(user => {
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        });
    });

    passport.use('local-login', new LocalStrategy(
        {
            passReqToCallback: true,
            session: true,
        },
        (req, username, password, done) => {
            User.findOne({where: {'username': username}}).then(user => {
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }));
};
