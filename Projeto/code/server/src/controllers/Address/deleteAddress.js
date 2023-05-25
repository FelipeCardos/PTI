const { Address } = require("../../database/models");

async function DeleteAddressWithId(id) {
  const address = await Address.findOne({
    where: {
      id: id,
    },
  });
  await address.destroy();
  return address;
}

module.exports = { DeleteAddressWithId };
