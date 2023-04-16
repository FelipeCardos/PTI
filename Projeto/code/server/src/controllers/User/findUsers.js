const {User} = require('../../database/models');


async function UserWithEmail(email) {
    const user = await User.findOne({
        where: {
            email: email
        }
    });

    return user;
}

async function FindUserOrCreate(name, email, password, typeUser) {

    const [user, created] = await User.findOrCreate({
        where: {email: email},
        defaults: {
            email: email,
            name: name,
            password: password,
            typeUser: typeUser
        }
    })

    return created;
}

async function FindUserById(id) {
    const user = await User.findOne({
        where: {id: id},
        attributes: { exclude: ['password'] }
    });
    return user;
}

async function FindAllUsers() {
    const users = await User.findAll({
        attributes: { exclude: ['password'] }
    });
    return users;
}

module.exports = {UserWithEmail, FindUserOrCreate, FindUserById, FindAllUsers};