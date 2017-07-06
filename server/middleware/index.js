
exports.isAuthenticated =function(req, res, next) {
    try {
        if (req.user.id) {
            return next();
        }
    } catch (Excep) {
        res.status(403).json({message: "You're not allow"});
    }
};
