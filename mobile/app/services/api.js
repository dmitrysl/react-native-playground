//const crypto = require('react-native-crypto');
const algorithm = 'aes-256-ctr';
const password = 'daf2ssog35_2!8*@3E+feq';

import { AsyncStorage, ToastAndroid, AlertIOS } from 'react-native';
var Toast = require('react-native-toast');

import * as constant from '../constants';


// function encrypt(text){
//     if (!text) return text;
//     var cipher = crypto.createCipher(algorithm, password)
//     var crypted = cipher.update(text, 'utf8', 'hex')
//     crypted += cipher.final('hex');
//     return crypted;
// }
 
// function decrypt(text) {
//     if (!text) return text;
//     var decipher = crypto.createDecipher(algorithm, password)
//     var dec = decipher.update(text, 'hex', 'utf8')
//     dec += decipher.final('utf8');
//     return dec;
// }

function login(login, pass) {
    if (login && pass) {
        AsyncStorage.setItem(constant.login, login);
        AsyncStorage.setItem(constant.pass, pass);
        // AsyncStorage.setItem(constant.pass, encrypt(pass));
    } else {
        login = AsyncStorage.getItem(constant.login);
        pass = AsyncStorage.getItem(constant.pass);
        // pass = decrypt(AsyncStorage.getItem(constant.pass));
    }
    
    return fetch(constant.loginUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' // application/x-www-form-urlencoded
            },
            body: JSON.stringify({
                login: login,
                pass: pass,
            })
        })
        .then((response) => response.json())
        .then((json) => {
            console.log("API.login.response.json", json);
            if (!json.success) {
                return json;
            }
            let token = json.token;
            console.log("API.login.response.jsontoken", token);
            try {
                AsyncStorage.setItem(constant.token, token);
                Toast.showShortTop.bind(null, "Logged in successfully");
                //AlertIOS.alert("Login Success!");
            } catch (error) {
                // Error saving data
                console.log('API.login.save_token ', error);
                return {success: false, message: 'Cannot save api token.'};
            }
            return {success: true};
        })
        .catch((error) => {
            console.error("API.login.response.error", error);
            return {success: false, message: error};
        });
}

async function logout() {
    try {
        await AsyncStorage.removeItem(constant.token);
        Toast.showShortTop.bind(null, "Logout success");
        //AlertIOS.alert("Logout Success!")
    } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
    }
}

function relogin(data, callback) {
    if (typeof data.success !== 'undefined' && !data.success) {
        return login()
            .then((resp) => {
                if (!resp.success) throw new Error("auth error");
            })
            .then(() => callback());
    }
    return data;
}

function getUsers() {
    return AsyncStorage.getItem(constant.token)
        .then(function(token) {
            console.log(token);
            return fetch(constant.listOfUsers, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'X-ACCESS-TOKEN': token
                        }
                    })
                    .then((response) => response.json())
                    .then((data) => relogin(data, getUsers))
                    .catch((error) => {
                        console.error(error);
                    });
        }, function(error) {
            console.log("API.getUsers.gettoken.error ", error);
            return null;
        });
}

module.exports = {
    'login': login,
    'getUsers': getUsers,
    'logout': logout
}