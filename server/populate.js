const axios = require('axios');
const sleep = require('sleep');

const url = 'http://127.0.0.1:8000/api/client';
let data;

for (let j = 0; j < 50; j++) {
    for (let i = 0; i < 200; i++) {
        data = {
            identifier: `popa${j}${i}`,
            lang: 'en',
            name: `popa${j}${i}`,
            type: 'demo',

        };
        axios.post(url, data).then(res => {
            console.log(res);
        }, err => {
            console.log(err.message);
        });
    }
    sleep.usleep(2);
}

