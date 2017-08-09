'use strict';

const env = process.env.NODE_ENV || 'development';
const parameters = require(`${__dirname}/../../config/parameters.json`)[env]; // eslint-disable-lin
const jwt = require('jsonwebtoken');
const userManager = require('../managers/user');
const utils = require('../utils/index');
exports.login = async(req, res) => {
try {
    const user = await userManager.getUserByUsername(req.body.username);
    console.log(user);
    if (user.length  === 0) {
        return res.status(401).json({ message: 'Incorrect username.' });
    } else if (user.length > 1) {
        return res.status(401).json({ message: 'More than one account with same username' });
    }
     if (!utils.checkPassword(req.body.password, user[0].password)) {
         return res.status(401).json({ message: 'Error in Username/Password' });
     }
    const payload = {
        sub: user[0].id,
    };
    const token = jwt.sign(payload, parameters.jwtSecret);
    const data = {
        name: user[0].name,
        role:user[0].role,
        id : user[0].id,
        token: token
    };
    console.log(data);
    return res.json(data);

} catch (err) {
    return res.status(500).json(err);
}


};
exports.logout = (req, res) => {
    req.logout();
    res.status(401).json({ message: 'You are not logged in' });
};

