'use strict';

const pathToRegexp = require('path-to-regexp');
const groupsAcl = require('./aclGroups');

const acl = {
    urlPath: {},
    aclGroup: {},
    add(element) {
        for (const k in element) {
            const ele = element[k];
            for (const i in ele) {
                const eleCheck = ele[i];
                if ((!Object.prototype.hasOwnProperty.call(eleCheck, 'groups')) ||
                    (!Object.prototype.hasOwnProperty.call(eleCheck, 'methods'))) {
                    throw new Error('Error creating acl');
                }
            }
        }
        Object.assign(this.urlPath, element);
    },
    get() {
        return this.urlPath;
    },
    checkRoute(req, element) {
        const groups = element.groups;
        const methods = element.methods;
        for (const i in groups) {
            const group = groups[i];

            if (group.indexOf(req.user.role) !== -1) {
                if ((methods.indexOf(req.method) !== -1) || (methods === '*')) {
                    return true;
                }
            }
        }
        return false;
    },
    middleware(req, res, next) {
        if (req.path === '/') {
            return next();
        }

        let keys;
        try {
            const role = req.user.role;
            if (!(groupsAcl.adminGroup.indexOf(role) !== -1)) {
                const urlPath = acl.get();
                for (const url in urlPath) {
                    const re = pathToRegexp(url, keys);
                    if (re.exec(req.path)) {
                        let pass = false;
                        const routeFound = urlPath[url];
                        routeFound.forEach(element => {
                            pass = acl.checkRoute(req, element);
                        });

                        if (pass) {
                            return next();
                        }
                        throw {message: 'You are not allow', id: 403};
                    }
                }
            } else {
                return next();
            }
        } catch (err) {
            if (Object.prototype.hasOwnProperty.call(err, 'id')) {
                return res.status(err.id).json({message: 'You are not logged'});
            }
            return res.status(401).json({message: err.message});
        }
        return next();
    },

};

const usersPath = {
    '/services/user': [
        {
            groups: [groupsAcl.adminGroup], // min group
            methods: ['*'],
        },
        {
            groups: [groupsAcl.managerGroup], // min group
            methods: ['GET'],
        },

    ],

};
const clientChannel = {
    '/services/client/:id(\\d+)/channel': [
        {
            groups: [groupsAcl.adminGroup],
            methods: ['*'],
        },
        {
            groups: [groupsAcl.managerGroup],
            methods: ['GET', 'POST'],
        },
    ],

};
const clientActions = {
    '/services/client/:id(\\d+)/*': [
        {
            groups: [groupsAcl.adminGroup], // min group
            methods: ['*'],
        },
        {
            groups: [groupsAcl.userGroup], // min group
            methods: ['GET', 'POST', 'PUT'],
        },
    ],

};
const clientDetail = {
    '/services/client/:id(\\d+)': [
        {
            groups: [groupsAcl.adminGroup], // min group
            methods: ['*'],
        },
        {
            groups: [groupsAcl.managerGroup], // min group
            methods: ['GET', 'POST', 'PUT'],
        },

        {
            groups: [groupsAcl.userGroup], // min group
            methods: ['GET'],

        },
    ],

};
const clientList = {
    '/services/client': [
        {
            groups: [groupsAcl.adminGroup], // min group
            methods: ['*'],
        },
        {
            groups: [groupsAcl.managerGroup], // min group
            methods: ['GET', 'POST', 'PUT'],
        },

        {
            groups: [groupsAcl.userGroup], // min group
            methods: ['GET'],

        },
    ],

};
const clientelevate = {
    '/services/client/elevate': [
        {
            groups: [groupsAcl.adminGroup], // min group
            methods: ['*'],
        },
        {
            groups: [groupsAcl.managerGroup], // min group
            methods: ['GET', 'POST', 'PUT'],
        },

    ],

};

const aclFix = acl;
aclFix.add(usersPath);
aclFix.add(clientList);
aclFix.add(clientList);
aclFix.add(clientDetail);
aclFix.add(clientChannel);
aclFix.add(clientActions);
aclFix.add(clientelevate);


module.exports = {
    aclFix,
};
