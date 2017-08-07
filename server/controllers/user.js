'use strict';

const t = require('tcomb-validation');
const domain = require('../validator');
const userManager = require('../managers/user');
const utils = require('../utils/permissions');


const performUserUpdate = async (id, element, input, req, res) => {
    utils.checkPermissions('users', 'update',  req, res);
    const result = t.validate(input, domain.CreateUpdateInput);
    try {
        if (!result.isValid()) {
            throw result.errors;
        }
        element.id = id;
        return await userManager.updateUser(element);
    } catch (err) {
        throw err;
    }
};


exports.addUser = async (req, res) => {
    utils.checkPermissions('users', 'create',  req, res);
    try {
        const input = req.body;
        const result = t.validate(input, domain.CreateInput);
        if (!result.isValid()) {
            throw err;
        }
        const element = await userManager.createUser(input);
        return res.json(element);
    } catch (err) {
        return res.status(500).json(err);
    }
};


exports.listUser = async (req, res) => {
    utils.checkPermissions('users', 'read',  req, res);
    try {
        const element = await userManager.getUsers();
        return res.json(element);
    } catch (err) {
        return res.status(500).json(err);
    }
};
exports.detailUser = async (req, res) => {
    utils.checkPermissions('users', 'read',  req, res);
    try {
        const element = await userManager.detailUser(req.params.id);
        return res.json(element);
    } catch (err) {
        return res.status(500).json(err);
    }
};


exports.updateUser = async (req, res) => {
    const input = req.body;

    try {
        const user = await userManager.checkUsername(input.username);
        if (user.length === 0) {
            throw err;
        }
        return res.status(400).json({ message: 'user already exist', user });
    } catch (err) {
        try {
            const result = await performUserUpdate(req.params.id, input, input, req, res);
            return res.json(result);
        } catch (err2) {
            return res.status(500).json(err2);
        }
    }
};

exports.activateUser = async (req, res) => {
    const input = req.body;
    const element = {};
    element.is_active = input.is_active;

    try {
        const result = await performUserUpdate(req.params.id, element, input, req, res);
        return res.json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.deleteUser = async (req, res) => {
    const input = req.body;
    const element = {};
    element.deleted_at = new Date();

    try {
        const result = await performUserUpdate(req.params.id, element, input, req, res);
        return res.json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
};
