'use strict';

const jwt = require('jsonwebtoken');
const groupsAcl = require('./aclGroups');
const userManager = require('../managers/user');

const env = process.env.NODE_ENV || 'development';
const parameters = require('../../config/parameters.json')[env]; // eslint-disable-lin

const acl = {
    urlPath: {},
    aclGroup: {},
    modelAcl: {},

    addModelAcl(element) {
        Object.assign(this.modelAcl, element);
    },
    get() {
        return this.urlPath;
    },

    middleware(req, res, next) {
        if (req.path === '/') {
            return next();
        }


        if (!req.headers.authorization) {
            return res.status(401).end();
        }

        const token = req.headers.authorization.split(' ')[1];
        return jwt.verify(token, parameters.jwtSecret, (err, decoded) => {
            if (err) { return res.status(401).end(); }

            const userId = decoded.sub;
            return userManager.detailUser(userId)
                    .then(user => {
                        req.user = { role: user.role, username: user.username };
                        return next();
                    }, () => res.status(401).end())
                .catch(() => res.status(401).end());
        });
    },
    modelMiddleware(name, action, role) {
        if (!Object.prototype.hasOwnProperty.call(this.modelAcl, name)) {
            return false;
        }
        const model = this.modelAcl[name];
        return model[action].indexOf(role) !== -1;
    },
};

// ACL MODELS
const usersModel = {
    'users': {
        create: groupsAcl.adminGroup,
        read: groupsAcl.managerGroup,
        update: groupsAcl.adminGroup,
        delete: groupsAcl.adminGroup,

    },

};


const clientDbModel = {
    'clientDb': {
        create: groupsAcl.managerGroup,
        read: groupsAcl.userGroup,
        update: groupsAcl.managerGroup,
        delete: groupsAcl.adminGroup,

    },

};

const clientMetaModel = {
    'clientMeta': {
        create: groupsAcl.managerGroup,
        read: groupsAcl.userGroup,
        update: groupsAcl.managerGroup,
        delete: groupsAcl.adminGroup,

    },

};


const aclFix = acl;
aclFix.addModelAcl(usersModel);
aclFix.addModelAcl(clientDbModel);
aclFix.addModelAcl(clientMetaModel);

module.exports = {
    aclFix,
};
