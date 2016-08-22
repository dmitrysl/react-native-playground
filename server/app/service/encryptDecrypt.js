const crypto = require('crypto');
const secret = 'abcdefg';

function hashPass(pass) {
    if (!pass) throw new Error("undefined pass");
    const hash = crypto.createHmac('sha256', secret)
                   .update(pass)
                   .digest('hex');
    return hash;
}

function validatePass(hash, pass) {
    if (!hash || !pass) return false;
    let toValidate = hashPass(pass);
    return toValidate === hash;
}

module.exports = {
    'hashPass': hashPass,
    'validatePass': validatePass
};