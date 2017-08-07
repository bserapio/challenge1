'use strict';

const t = require('tcomb-validation');
const domain = require('../validator');
const userManager = require('../managers/user');


const performUserUpdate = async (id, element, input) => {
    const result = t.validate(input, domain.CreateUpdateInput);
    try {
        if (!result.isValid()) {
            throw result.errors;
        }
        element.id = id;
        return await userManager.updateUser(element)
    } catch (err) {
        throw err;
    }
};



exports.addUser = async (req, res) => {
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
}


exports.listUser = async (req, res) => {
    try {
        const element = await userManager.getUsers();
        return res.json(element);
    } catch (err) {
        return res.status(500).json(err);
    }
};
exports.detailUser = async (req, res) => {
    try {
        const element = await userManager.detailUser(req.params.id);
        return res.json(element);
    } catch (err) {
        return res.status(500).json(err);
    }
};



exports.updateUser = (req, res) => {
    const input = req.body;

    if (input.username) {
        userManager.getUserByUserName(input.username).then(user => {
            if (user) {
                res.status(400).json({ message: 'username already exists' });
            }
        });
    }


    return performUserUpdate(req.params.id, input, input).then(
        result => res.json(result),
        error => {
            console.log(error);
            res.status(400).json(error);
        }
    )
        .catch(
            error => res.status(500).json(error)
        );
};

exports.activateUser = async (req, res) => {
    const input = req.body;
    const element = {};
    element.is_active = input.is_active;

    try {
        const result = await performUserUpdate(req.params.id, element, input);
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
        const result = await performUserUpdate(req.params.id, element, input);
        return res.json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
};
