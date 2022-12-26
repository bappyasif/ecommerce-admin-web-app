const express = require("express");
const { confirmCustomerIsAuthenticate } = require("../configs/forJWT");
const { generateTokensForCustomerOnLogin, grantCustomerAnotherAccessTokenOnValidRefreshToken, logoutCustomer } = require("../controllers/authJWT");
const { customerLogin, customerRegistration, getAllExistingCustomers } = require("../controllers/customerAuth");
const { getAllAvailableProducts, getSpecificProductFromProductsList } = require("../controllers/forProducts");
const routes = express();

routes.get("/all-customers", confirmCustomerIsAuthenticate, getAllExistingCustomers);
routes.post("/login", customerLogin);
routes.post("/register", customerRegistration);

routes.post("/accecss-tokens", generateTokensForCustomerOnLogin);
routes.post("/new-access-token", grantCustomerAnotherAccessTokenOnValidRefreshToken);
routes.delete("/logout", logoutCustomer);

routes.get("/all-products", getAllAvailableProducts)
routes.get("/all-products/:prodId", getSpecificProductFromProductsList)
// routes.post("/all-products/:prodId")
module.exports = routes