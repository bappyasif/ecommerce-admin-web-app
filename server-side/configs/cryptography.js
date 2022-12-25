const bcrypt = require("bcrypt");

const generateHashedPasswordForCustomerRegistration = (password, salt) => {
    return bcrypt.hash(password, salt)
            .then(hashedPassword => hashedPassword)
            .catch(err => console.log(err))
}

const compareHashedPasswordFromCustomerLogin = (currentHash, storedHash) => {
    return bcrypt.compare(currentHash, storedHash)
            .then(result => result)
            .catch(err => console.log(err))
}

module.exports = {
    generateHashedPasswordForCustomerRegistration,
    compareHashedPasswordFromCustomerLogin
}