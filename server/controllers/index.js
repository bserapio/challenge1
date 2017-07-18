'use strict';

exports.login = (req, res) => {
    res.json({ id: req.user.id, username: req.user.username });
};
exports.logout = (req, res) => {
    res.json({ id: req.user.id, username: req.user.username });
};

