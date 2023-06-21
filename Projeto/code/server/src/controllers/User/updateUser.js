const { User } = require("../../database/models");

async function UpdateUser(id, name, phone, fiscal_identifier, address_id) {
  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (fiscal_identifier) user.fiscal_identifier = fiscal_identifier;
  if (address_id) user.address_id = address_id;
  await user.save();
  return user;
}

async function UpdateUserNameWithId(id, name) {
  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  user.name = name;
  await user.save();
  return user;
}

async function UpdateUserEmailWithId(id, email) {
  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  user.email = email;
  await user.save();
  return user;
}

async function UpdateUserPasswordWithId(id, hashPassword) {
  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  user.password = hashPassword;
  await user.save();
  return user;
}

async function UpdateUserFiscalIdentifierWithId(id, fiscal_identifier) {
  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  user.fiscal_identifier = fiscal_identifier;
  await user.save();
  return user;
}

async function UpdateUserAddressIdWithId(id, address_id) {
  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  user.address_id = address_id;
  await user.save();
  return user;
}

async function UpdateUserPhoneWithId(id, phone) {
  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  user.phone = phone;
  await user.save();
  return user;
}

async function UpdateUserStatusWithId(id){
  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  //Função pode ser utilizada para ativar e desativar
  //já que se está ativo a unica mudança seria para desativar e
  //se esta desativo, a única mudança seria para ativar
  user.active = !user.active; 
  await user.save();
}

module.exports = {
  UpdateUserStatusWithId,
  UpdateUser,
  UpdateUserNameWithId,
  UpdateUserEmailWithId,
  UpdateUserPasswordWithId,
  UpdateUserFiscalIdentifierWithId,
  UpdateUserAddressIdWithId,
  UpdateUserPhoneWithId,
};
