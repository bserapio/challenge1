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
        res.status(401).json({message: "Not logged user"});
    }
};


exports.isAdmin = (req, res, next) => {
    try {
        if (groups.adminGroups.indexOf(req.user.role) === -1) {
            throw err;
        }
        if (req.method === 'DELETE' && (groups.adminGroups.indexOf(req.user.role) === -1)) {
            res.status(405).json({message: 'Method not allow'});
        }

        return next();
    } catch (err) {
        res.status(403).json({message: 'You are  not allow'});
    }
};
