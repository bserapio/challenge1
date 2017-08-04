'use strict';

const t = require('tcomb-validation');
const domain = require('../validator');
const db = require('../old_db/models');
const clientManager = require('../managers/client');
const clientMetaManager = require('../managers/client_meta');

const performClientUpdate = async (id, element, input) => {
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
    const input = req.body;
    const result = t.validate(input, domain.CreateDbInput);
    if (!result.isValid()) {
        res.status(400).json(result.errors);
    } else {
        try {
            const client = await clientManager.createClient(req.user, input);
            return res.json(client);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
};

exports.listClient = async (req, res) => {
    try {
        const result =  await clientManager.listClient();

        return res.json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.detailClient = async (req, res) => {
    try {
        const result =  await clientManager.detailClient(req.params.id);
        return res.json(result[0]);
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.removeClient = async (req, res) => {
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
    const input = req.body;
    const element = {};
    element.active = input.active;

    try {
        const result = await performClientUpdate(req.params.id, element, input);
        return res.json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.manteinanceClient = async (req, res) => {
    const input = req.body;
    const element = {};
    element.maintenance = input.maintenance;
    try {
        const result = await performClientUpdate(req.params.id, element, input);
        return res.json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
};


exports.autoUpdateClient = async (req, res) => {
    const input = req.body;
    const element = {};
    element.auto_update = input.auto_update;
    try {
        const result = await performClientUpdate(req.params.id, element, input);
        return res.json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.newInvoiceClient = async (req, res) => {
    const input = req.body;
    const element = {};
    element.new_invoice = input.client_metas.new_invoice;
    try {
        const result = await performClientMetaUpdate(req.params.id, element, input);
        return res.json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.channelClient = async (req, res) => {
    const input = req.body;
    const element = {};
    element.new_channel = input.client_metas.new_channel;
    try {
        const result = await performClientMetaUpdate(req.params.id, element, input);
        return res.json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
};


exports.ikentooClient = async (req, res) => {
    const input = req.body;
    const element = {};
    element.ikentoo = input.client_metas.ikentoo;
    try {
        const result = await performClientMetaUpdate(req.params.id, element, input);
        return res.json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.updateClient = async (req, res) => {
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


exports.elevateClient = (req, res) => {
    const input = req.body;

    db.User.findOne({ where: { 'username': input.username } }).then(user => {
        if (!user) {
            res.status(404).json({ message: 'Incorrect username.' });
        } else if (!user.validPassword(input.password)) {
            res.status(403).json({ message: 'Incorrect password.' });
        } else {
            res.json({ key: 'doudfsifdkjasvgdasjhgdasgk' });
        }
        // TODO: Here I need call API for elevate Token
    });
};

