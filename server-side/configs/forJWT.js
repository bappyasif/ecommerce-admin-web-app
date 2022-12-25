const jwt = require("jsonwebtoken");

const generateCustomerAccessToken = (user) => {
    return jwt.sign(user, process.env.SECRET_TOKEN, {expiresIn: "1d"})
}

const generateCustomerRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN)
}

const verifyCallbackForRefreshToken = (err, user) => {
    if(err) return null

    return generateCustomerAccessToken(user);
}

const verifyRefreshTokenAndGrantAnotherAccessToken = (refreshToken) => {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN, verifyCallbackForRefreshToken)
}

const confirmCustomerIsAuthenticate = (req, res, next) => {
    // idnetifying authorization header from request object for Bearer token extraction
    const authHeader = req.headers["authorization"];

    const token = authHeader.split(" ")[1]

    if(token === null) return res.status.status(401).json({msg: "authorization token is missing"})

    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        if(err) return res.status(403).json({msg: "Authentication failed!! Invalid Token!!"})
    
        // otherwise keeping user in req object for to be used in next function in middleware function, from where it was called from
        req.user = user

        next();
    })
}

module.exports = {
    generateCustomerAccessToken,
    generateCustomerRefreshToken,
    verifyRefreshTokenAndGrantAnotherAccessToken,
    confirmCustomerIsAuthenticate
}