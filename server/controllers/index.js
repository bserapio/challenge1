'use strict';

exports.login = (req, res) => {
    res.json({id: req.user.id, username: req.user.username, role: req.user.role});
};
exports.logout = (req, res) => {
    res.json({ id: req.user.id, username: req.user.username });
};

