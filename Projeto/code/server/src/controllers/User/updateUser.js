const {FindUserById} = require('./findUsers');

async function UpdateUser(id, name, phone, fiscal_identifier, address_id) {
    try {
        FindUserById(id).then((user) => {
            if (name) {
                user.name = name;
            }
            if (phone) {
                user.phone = phone;
            }
            if (fiscal_identifier) {
                user.fiscal_identifier = fiscal_identifier;
            }
            if (address_id) {
                user.address_id = address_id;
            }
            user.save();
        });
    } catch (err) {
        return false;
    }
    return true;
};





module.exports = {UpdateUser};