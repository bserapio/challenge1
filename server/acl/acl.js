'use strict';

const utils = require('../utils/index');

const guestGroup = ['admin', 'super', 'manager', 'finance', 'sales', 'account-manager', 'user', 'guest'];
const userGroup = utils.remove(guestGroup, 'guest');
const managerGroup = utils.remove(userGroup, 'user');
let salesGroup = utils.remove(managerGroup, 'finance');
salesGroup = utils.remove(salesGroup, 'manager');
const accountManagerGroup = utils.remove(salesGroup, 'sales');
const adminGroup = utils.remove(accountManagerGroup, 'account-manager');
const superGroup = utils.remove(adminGroup, 'admin');


module.exports = {
    guestGroup,
    userGroup,
    managerGroup,
    salesGroup,
    accountManagerGroup,
    adminGroup,
    superGroup,

};





