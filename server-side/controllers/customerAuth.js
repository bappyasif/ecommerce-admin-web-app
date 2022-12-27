const { generateHashedPasswordForCustomerRegistration, compareHashedPasswordFromCustomerLogin } = require("../configs/cryptography");

let users = [];

const getAllExistingCustomers = (req, res) => res.status(201).json({users: users})

const getSpecificCustomer = (req, res) => {
    const mobileNumber = req.params.custId;
    const user = users.find(user => user.mobileNumber === mobileNumber)
    res.status(201).json({user: user, msg: "user extracted"})
}

const adminLogin = (req, res) => {
    const secret = req.body.secret;
    if(secret === "root1234") {
        res.status(201).json({msg: "Admin Access Is Granted", success: true})
    } else {
        res.status(403).json({msg: "Admin Secret Code Mismatched", success: false})
    }
}

const customerLogin = (req, res) => {
    const mobileNumber = req.body.digits;
    const password = req.body.password;

    const user = users.find(item => item.mobileNumber === mobileNumber);

    if(user === null) {
        res.status(400).json({msg: "user is not found"})
    }

    compareHashedPasswordFromCustomerLogin(password, user.hashedPassword)
        .then(result => {
            if(result) {
                res.status(201).json({msg: "password matched", user: user})
            } else {
                res.status(500).json({msg: "password did not match!!"})
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({msg: "login failed!!"})
        })
}

const customerRegistration = (req, res) => {
    const mobileNumber = req.body.digits;
    const plainPassword = req.body.password;
    const customerName = req.body.name;

    generateHashedPasswordForCustomerRegistration(plainPassword, 10)
        .then(hashedPassword => {
            const user = {mobileNumber: mobileNumber, hashedPassword: hashedPassword, customerName: customerName}
            users.push(user)
            res.status(201).json({msg: "registration successful", user: user})
        }).catch(err => {
            console.log(err, "registration failed!!")
            res.status(500).json({msg: "registration failed"})
        })
}

module.exports = {
    getAllExistingCustomers,
    customerLogin,
    customerRegistration,
    adminLogin,
    getSpecificCustomer
}