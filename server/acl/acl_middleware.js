'use strict';

const pathToRegexp = require('path-to-regexp');

const groupsAcl = require('./acl');
const aclRoutes = require('./acl_routes');


const checkRoute = (req, element) => {
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
};


exports.aclMiddleware = (req, res, next) => {
    // Here goes paths that pass middleware
    if (req.path === '/') {
        return next();
    }
    let keys;
    try {
        if (!req.user.id) {
            throw {message: 'You are not logged', id: 401};
        }

        if (!(groupsAcl.adminGroup.indexOf(req.user.role) !== -1)) {
            for (const url in aclRoutes.urlPath) {
                const re = pathToRegexp(url, keys);
                if (re.exec(req.path)) {
                    let pass = false;
                    // PATH FOUND
                    const routeFound = aclRoutes.urlPath[url];
                    routeFound.forEach(element => {
                        pass = checkRoute(req, element);
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
        console.log(err);
        return res.status(err.id).json({message: err.message});
    }
};
