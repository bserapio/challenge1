// load all the things we need

const passportJWT = require('passport-jwt');
const Strategy = passportJWT.Strategy;
const env = process.env.NODE_ENV || 'development';

const parameters = require(`${__dirname}/../../config/parameters.json`)[env]; // eslint-disable-line
const dbApiService  = require('../db/dbApiService');
const utils = require('../utils/index');

module.exports = function (passport) {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    const strategy = new Strategy(
        {
            passReqToCallback: true,
            session: true,
        },
        (req, username, password, done) => {
            dbApiService.getDataProvider('pool_name', 'schema_name').then(
                dataProvider => {
                    try {
                        const query = { where: { username: { '$type': 'eq', '$value': username } },
                            order: [['id', 'ASC']] };
                        dataProvider.fetchAll('users', query).then(
                            user => {
                                if (user.length === 0) {
                                    return done(null, false, { message: 'Incorrect username.' });
                                } else if (user.length > 1) {
                                    return done(null, false, { message: 'More than one account with same username' });
                                }
                                if (utils.checkPassword(password, user[0].password)) {
                                    return done(null, user[0]);
                                }
                                return done(null, false, { message: 'Incorrect password.' });
                            },
                            error => {
                                return  done(null, false, { message: 'Incorrect password.' });
                            }

                        );
                    } catch (err) {
                        return done(null, false);
                    }
                },
                () => done(null, false)
            );
        })
    // used to deserialize the user
    passport.deserializeUser(async (id, done) => {
        const dataProvider = await dbApiService.getDataProvider('pool_name', 'schema_name');

        try {
            const user = await dataProvider.fetchOne('users', parseInt(id));
            return done(null, user);
        } catch (err) {
            return done(null, false);
        }
    });

    passport.use('local-login', strategy);
};
