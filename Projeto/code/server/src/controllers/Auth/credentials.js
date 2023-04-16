const {Credentials} = require('../../database/models');

async function FindCredential(cred) {
    const credential = await Credentials.findOne({
        where: {
            value: cred
        }
    });

    return credential;
}
module.exports = {FindCredential};