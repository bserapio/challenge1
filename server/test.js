
var bcrypt = require('bcrypt-nodejs');

var hash = "$2y$10$v3oFTxGrDlfQhSEM4/pc7OG/aWL/2GjM9hsyw.n1wdTw6eEPUVA3G";

hash =hash.substring(4);
hash = '$2a$'+hash;

console.log(bcrypt.compareSync("test", hash)); // true
console.log(bcrypt.compareSync("$2y$10$WiplgLEJtp17nTnkLT821eeIUg.FSFTnHkLtyynEgG8EThT8M6a5C", hash)); // false