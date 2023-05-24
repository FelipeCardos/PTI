const { Credentials } = require("../../database/models");

async function FindCredentialsByUserId(userId) {
  const credentials = await Credentials.findOne({
    where: { user_id: userId },
  });
  return credentials;
}

async function FindAllCredentialsWithProvider(provider) {
  const credentials = await Credentials.findAll({
    where: { provider: provider },
  });
  return credentials;
}

module.exports = { FindCredentialsByUserId, FindAllCredentialsWithProvider };
