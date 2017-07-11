
exports.isAuthenticated =function(req, res, next) {
    console.log(req.session);
    try {
        if (req.user.id) {
            return next();
        }
    } catch (Excep) {
        console.log(Excep);
        res.status(403).json({message: "You're not allow"});
    }
};

exports.isAdmin =function(req, res, next) {
    try {
        const canDelete= ['admin','super'];

        if (canDelete.indexOf(req.user.role) >=0 ) {
            return next();
        }
    } catch (Excep) {

        res.status(403).json({message: "You're not allow"});
    }
};

exports.test =function(req, res, next) {
    console.log("Hola tio");
    console.log(req.session);
    console.log(req.isAuthenticated());
    return next();
};

exports.cors = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return next();
};