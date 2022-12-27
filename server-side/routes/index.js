const express = require("express");
const { confirmCustomerIsAuthenticate } = require("../configs/forJWT");
const { generateTokensForCustomerOnLogin, grantCustomerAnotherAccessTokenOnValidRefreshToken, logoutCustomer } = require("../controllers/authJWT");
const { customerLogin, customerRegistration, getAllExistingCustomers, adminLogin } = require("../controllers/customerAuth");
const { newOrderIsPlaced, getListOfAllOrders } = require("../controllers/forOrders");
const { getAllAvailableProducts, getSpecificProductFromProductsList } = require("../controllers/forProducts");
const routes = express();

// routes.get("/all-customers", confirmCustomerIsAuthenticate, getAllExistingCustomers);
routes.get("/all-customers", getAllExistingCustomers);
routes.post("/login", customerLogin);
routes.post("/register", customerRegistration);
routes.post("/admin-login", adminLogin);

routes.post("/accecss-tokens", generateTokensForCustomerOnLogin);
routes.post("/new-access-token", grantCustomerAnotherAccessTokenOnValidRefreshToken);
routes.delete("/logout", logoutCustomer);

routes.get("/all-products", getAllAvailableProducts)
routes.get("/all-products/:prodId", getSpecificProductFromProductsList)
// routes.post("/all-products/:prodId")

routes.post("/new-order", newOrderIsPlaced)
routes.get("/all-orders", getListOfAllOrders)
module.exports = routes