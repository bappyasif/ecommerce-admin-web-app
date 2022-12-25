const express = require("express");
const { confirmCustomerIsAuthenticate } = require("../configs/forJWT");
const { generateTokensForCustomerOnLogin, grantCustomerAnotherAccessTokenOnValidRefreshToken, logoutCustomer } = require("../controllers/authJWT");
const { customerLogin, customerRegistration, getAllExistingCustomers } = require("../controllers/customerAuth");
const routes = express();

routes.get("/all-customers", confirmCustomerIsAuthenticate, getAllExistingCustomers);
routes.post("/login", customerLogin);
routes.post("/register", customerRegistration);

routes.post("/accecss-tokens", generateTokensForCustomerOnLogin);
routes.post("/new-access-token", grantCustomerAnotherAccessTokenOnValidRefreshToken);
routes.delete("/logout", logoutCustomer);

module.exports = routes