const {Address} = require('../../database/models');

async function CreateAddress(country, state, street, postal_code) {
    const address = await Address.create({
        country: country,
        state: state,
        street: street,
        postal_code: postal_code,
    });
    return address;
};

module.exports = {CreateAddress};