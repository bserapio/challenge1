const aclModel = require('../acl/index');

const checkPermissions = (model, action, req, res) => {
    if (aclModel.aclFix.modelMiddleware(model, action, req.user.role)) {
        return true;
    }
    return res.status('403').json({ message: 'You are not allow' });
};


module.exports = {

    checkPermissions,
};
