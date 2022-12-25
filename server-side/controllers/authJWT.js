const { generateCustomerAccessToken, generateCustomerRefreshToken, verifyRefreshTokenAndGrantAnotherAccessToken } = require("../configs/forJWT");

let refreshTokens = [];

const generateTokensForCustomerOnLogin = (req, res) => {
    const mobileNumber = req.body.digits;
    
    const user = {mobileNumber: mobileNumber}

    const customerAccessToken = generateCustomerAccessToken(user);
    const customerRefreshToken = generateCustomerRefreshToken(user);

    refreshTokens.push(customerRefreshToken);
    
    res.status(200).json({msg: "access tokens", accessToken: customerAccessToken, refreshToken: customerRefreshToken})
}

const logoutCustomer = (req, res) => {
    const currentRefreshToken = req.body.refreshToken;

    refreshTokens = refreshTokens.filter(token => token !== currentRefreshToken);

    res.status(204).json({msg: "user successfully logged out"})
}

const grantCustomerAnotherAccessTokenOnValidRefreshToken = (req, res) => {
    const currentRefreshToken = req.body.refreshToken;

    if(currentRefreshToken === null) return res.status(401).json({msg: "token undefined"})

    if(!refreshTokens.includes(currentRefreshToken)) return res.status(403).json({msg: "token is not found"})

    const getAnotherAccessToken = verifyRefreshTokenAndGrantAnotherAccessToken(currentRefreshToken)

    if(!getAnotherAccessToken) return res.status(403).json({msg: "given refresh token does not match"})

    res.status(201).json({msg: "another access key granted", accessToken: getAnotherAccessToken})
}

module.exports = {
    generateTokensForCustomerOnLogin,
    logoutCustomer,
    grantCustomerAnotherAccessTokenOnValidRefreshToken
}