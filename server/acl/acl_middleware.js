'use strict';

const urls = require('./acl_routes');
const groups = require('./acl_groups');

exports.isAuthenticated = (req, res, next) => {
    if (req.path === '/') {
        return next();
    }

    try {
        if (req.user.id) {
            console.log(req.method);
            if (req.method === 'DELETE' && (groups.adminGroups.indexOf(req.user.role) === -1)) {
                return res.status(405).json({message: 'Method not allow'});
            }
            return next();
        }
    } catch (Excep) {
        res.status(401).json({message: 'Not logged user'});
    }
};


exports.isAdmin = (req, res, next) => {
    try {
        if (groups.adminGroups.indexOf(req.user.role) === -1) {
            throw err;
        }

        return next();
    } catch (err) {
        res.status(403).json({message: 'You are  not allow'});
    }
};

exports.isManager = (req, res, next) => {
    try {
        if (groups.managerGroups.indexOf(req.user.role) === -1) {
            throw err;
        }

        return next();
    } catch (err) {
        res.status(403).json({message: 'You are  not allow'});
    }
};
