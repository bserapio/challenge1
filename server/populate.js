const axios = require('axios');
const sleep = require('sleep');

axios.defaults.withCredentials = true;
const url = 'http://127.0.0.1:8000/services/client';


const loginUrl = 'http://127.0.0.1:8000/login';
const data = {
    username: 'admin',
    password: 'admin123',
};
axios(loginUrl, { method: 'POST', data }).then(res => {
    console.log(res.data);
    sleep.msleep(2000);
    for (let j = 0; j < 50; j++) {
        for (let i = 0; i <= 200; i++) {
            const data2 = {
                identifier: `popa${j}${i}`,
                lang: 'en',
                name: `popa${j}${i}`,
                type: 'demo',

            };
            axios({
                method: 'post',
                url,
                data: data2,
            }).then(res => {
                console.log(res);
                sleep.msleep(2000);
                if (i % 50 === 0) {
                    sleep.msleep(2000);
                }
            }, err => {
                console.log(err.message);
            });
        }
    }
}, err => {
    console.log(err);
});
