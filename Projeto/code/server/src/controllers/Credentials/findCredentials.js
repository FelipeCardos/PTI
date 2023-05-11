const { Credentials } = require("../../database/models");

async function FindCredentialsByUserId(userId) {
  const credentials = await Credentials.findOne({
    where: { user_id: userId },
  });
  return credentials;
}

module.exports = { FindCredentialsByUserId };
