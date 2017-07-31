'use strict';

exports.login = (req, res) => {
    res.json({id: req.user.id, username: req.user.username, role: req.user.role});
};
exports.logout = (req, res) => {
    req.logout();
    res.status(401).json({message: 'You are not logged in'});
};

