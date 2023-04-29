const bcrypt = require('bcryptjs');

async function ComparePassword(tryPassword, password) {
    const match = await bcrypt.compare(tryPassword, password);
    return match;
}

async function HashPassword(password) {
    const hash = await bcrypt.hash(password, 14);
    return hash;
}

module.exports = {ComparePassword, HashPassword};