const { User } = require("../../database/models");

async function DeleteUserWithId(id) {
  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  await user.destroy();
  return user;
}

module.exports = { DeleteUserWithId };
