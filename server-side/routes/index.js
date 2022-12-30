const express = require("express");
const { confirmCustomerIsAuthenticate } = require("../configs/forJWT");
const { generateTokensForCustomerOnLogin, grantCustomerAnotherAccessTokenOnValidRefreshToken, logoutCustomer } = require("../controllers/authJWT");
const { customerLogin, customerRegistration, getAllExistingCustomers, adminLogin, getSpecificCustomer, removeSpecificCustomer } = require("../controllers/customerAuth");
const { newOrderIsPlaced, getListOfAllOrders, getSpecificOrderItem } = require("../controllers/forOrders");
const { getAllAvailableProducts, getSpecificProductFromProductsList, removeSpecificProductFromProductsList, addNewProductIntoProductsList } = require("../controllers/forProducts");
const routes = express();

routes.get("/all-customers", confirmCustomerIsAuthenticate, getAllExistingCustomers);
routes.get("/all-customers/:custId", getSpecificCustomer);
routes.delete("/all-customers/:custId", removeSpecificCustomer);

routes.post("/login", customerLogin);
routes.post("/register", customerRegistration);
routes.post("/admin-login", adminLogin);

routes.post("/access-tokens", generateTokensForCustomerOnLogin);
routes.post("/new-access-token", grantCustomerAnotherAccessTokenOnValidRefreshToken);
routes.delete("/logout", logoutCustomer);

routes.get("/products", getAllAvailableProducts)
routes.get("/all-products", confirmCustomerIsAuthenticate, getAllAvailableProducts)
routes.post("/all-products/", addNewProductIntoProductsList)
routes.get("/all-products/:prodId", getSpecificProductFromProductsList)
routes.delete("/all-products/:prodId", removeSpecificProductFromProductsList)

routes.post("/new-order", newOrderIsPlaced)
routes.get("/all-orders", confirmCustomerIsAuthenticate, getListOfAllOrders)
routes.get("/all-orders/:orderId", getSpecificOrderItem)
module.exports = routes