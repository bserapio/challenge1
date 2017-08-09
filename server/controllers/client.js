'use strict';

const t = require('tcomb-validation');
const domain = require('../validator');
const clientManager = require('../managers/client');
const clientMetaManager = require('../managers/client_meta');
const userManager = require('../managers/user');
const utils = require('../utils/permissions');

const performClientUpdate = async (id, element, input, req, res) => {
    utils.checkPermissions('clientDb', 'update',  req, res);
    const result = t.validate(input, domain.CreateUpdateDbInput);
    try {
        if (!result.isValid()) {
            throw result.errors;
        }
        return await clientManager.updateClient(id, element);
    } catch (err) {
        throw err;
    }
};

const performClientMetaUpdate = async (id, element, input) => {
    const result = t.validate(input, domain.CreateUpdateDbInput);
    try {
        if (!result.isValid()) {
            throw result.errors;
        }
        return await clientMetaManager.updateMeta(id, element);
    } catch (err) {
        throw err;
    }
};


exports.addClient = async (req, res) => {
    utils.checkPermissions('clientDb', 'create',  req, res);
    const input = req.body;
    const result = t.validate(input, domain.CreateDbInput);
    if (!result.isValid()) {
        res.status(400).json(result.errors);
    }

    try {
        const client = await clientManager.createClient(req.user, input);
        return res.json(client);
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.listClient = async (req, res) => {
    utils.checkPermissions('clientDb', 'read',  req, res);
    try {
        const result =  await clientManager.listClient(req.user.role);

        return res.json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.detailClient = async (req, res) => {
    utils.checkPermissions('clientDb', 'read',  req, res);
    try {
        const result =  await clientManager.detailClient(req.params.id);
        return res.json(result[0]);
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.removeClient = async (req, res) => {
    utils.checkPermissions('clientDb', 'delete',  req, res);
    try {
        let message = 'Nothing deleted';
        const result =  await clientManager.deleteClient(req.params.id);
        if (result) {
            message = 'Remove succesfully;';
        }
        return res.status(204).json({ message });
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.activateClient = async (req, res) => {
    utils.checkPermissions('clientDb', 'update',  req, res);
    const input = req.body;
    const element = {};
    element.active = input.active;

    try {
        const result = await performClientUpdate(req.params.id, element, input, req, res);
        return res.json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.manteinanceClient = async (req, res) => {
    utils.checkPermissions('clientDb', 'update',  req, res);
    const input = req.body;
    const element = {};
    element.maintenance = input.maintenance;
    try {
        const result = await performClientUpdate(req.params.id, element, input, req, res);
        return res.json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
};


exports.autoUpdateClient = async (req, res) => {
    utils.checkPermissions('clientDb', 'update',  req, res);
    const input = req.body;
    const element = {};
    element.autoUpdate = input.autoUpdate;
    try {
        const result = await performClientUpdate(req.params.id, element, input, req, res);
        return res.json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.newInvoiceClient = async (req, res) => {
    utils.checkPermissions('clientMeta', 'update',  req, res);
    const input = req.body;
    const element = {};
    element.newInvoice = input.clientMeta.newInvoice;
    try {
        const result = await performClientMetaUpdate(req.params.id, element, input);
        return res.json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.channelClient = async (req, res) => {
    utils.checkPermissions('clientMeta', 'update',  req, res);
    const input = req.body;
    const element = {};
    element.newChannel = input.clientMeta.newChannel;
    try {
        const result = await performClientMetaUpdate(req.params.id, element, input);
        return res.json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
};


exports.ikentooClient = async (req, res) => {
    utils.checkPermissions('clientMeta', 'update',  req, res);
    const input = req.body;
    const element = {};
    element.ikentoo = input.clientMeta.ikentoo;
    try {
        const result = await performClientMetaUpdate(req.params.id, element, input);
        return res.json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.updateClient = async (req, res) => {
    utils.checkPermissions('clientDb', 'update',  req, res);
    const input = req.body;
    const result = t.validate(input, domain.CreateUpdateDbInput);
    try {
        if (!result.isValid()) {
            throw result.errors;
        }
        const resu = await clientManager.fullUpdate(req.params.id, input);
        return res.json(resu);
    } catch (err) {
        return res.status(500).json(err);
    }
};


exports.elevateClient = async (req, res) => {
    try {
        const input = req.body;
        const user = await userManager.getUserByUsername(input.username);
        if (user.length === 0) {
            return res.status(404).json({ message: 'Incorrect username.' });
        } else if (user.length > 1) {
            return res.status(403).json({ message: 'More than one account with same username' });
        }
        if (!utils.checkPassword(req.body.password, user[0].password)) {
            return res.status(403).json({ message: 'Error in Username/Password' });
        }
        return res.json({ key: 'doudfsifdkjasvgdasjhgdasgk' });
    } catch (err) {
        return res.status(500).json(err);
    }
};

