const {FindAddressById} = require('./findAddress');

async function UpdateAddress(id,country, state, street, postal_code) {
    try {
        FindAddressById(id).then((address) => {
            if (country) {
                address.country = country;
            }
            if (state) {
                address.state = state;
            }
            if (street) {
                address.street = street;
            }
            if (postal_code) {
                address.postal_code = postal_code;
            }
            address.save();
        });
    } catch (err) {
        return false;
    }
    return true;
};

module.exports = {UpdateAddress};