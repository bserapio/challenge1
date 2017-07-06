
exports.login = function(req, res) {
    res.json({ id: req.user.id, username: req.user.username });
};
exports.logout = function(req, res) {
    res.json({ id: req.user.id, username: req.user.username });
};

