var bcrypt = require('bcrypt');

import * as constant from '../constants';

let Token = "";

function login(login, pass) {
    return fetch(constant.loginUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: login,
                pass: pass,
            })
        })
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
}

function getUsers() {
    return fetch(constant.listOfUsers, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-ACCESS-TOKEN': Token
            }
            // body: JSON.stringify({
            // firstParam: 'yourValue',
            // secondParam: 'yourOtherValue',
            // })
        })
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
}

module.exports = {
    'login': login,
    'getUsers': getUsers
}