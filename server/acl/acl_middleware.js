'use strict';

const urls = require('./acl_routes');
const groups = require('./acl_groups');

exports.isAuthenticated = (req, res, next) => {

    if (req.path === '/') {
        return next();
    }

    try {
        if (req.user.id) {
            return next();
        }
    } catch (Excep) {
        res.status(401).json({message: "You're not allow"});
    }
};


exports.isAdmin = (req, res, next) => {
    try {
        if (groups.adminGroups.indexOf(req.user.role) === -1) {
            throw err;
        }
        return next();
    } catch (err) {
        res.status(403).json({message: "You're not allow"});
    }
};
