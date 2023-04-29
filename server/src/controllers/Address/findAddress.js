const {Address} = require('../../database/models');

async function FindAddressById(id) {
    const address = await Address.findOne({
        where: {id: id}
    });
    return address;
}

module.exports = {FindAddressById};