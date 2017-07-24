'use strict';

const groups = require('../../src/config/acl_groups');

exports.isAuthenticated = (req, res, next) => {
    if (req.path === '/') {
        return next();
    }

    try {
        if (req.user.id) {
            if (req.method === 'DELETE' && (groups.adminGroups.indexOf(req.user.role) === -1)) {
                return res.status(405).json({message: 'Method not allow'});
            }
            return next();
        }
        throw new Error(401, 'Not logged user');
    } catch (err) {
        return res.status(401).json({message: 'Not logged user'});
    }
};


exports.isAdmin = (req, res, next) => {
    try {
        if (groups.adminGroups.indexOf(req.user.role) === -1) {
            throw new Error(403, 'You are  not allow');
        }

        return next();
    } catch (err) {
        return res.status(403).json({message: 'You are  not allow'});
    }
};

exports.isManager = (req, res, next) => {
    try {
        if (groups.managerGroups.indexOf(req.user.role) === -1) {
            throw new Error(403, 'You are  not allow');
        }

        return next();
    } catch (err) {
        return res.status(403).json({message: 'You are  not allow'});
    }
};
