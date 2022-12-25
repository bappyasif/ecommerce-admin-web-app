require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");

app.use(express.json());
app.use(routes)

app.listen(4000, () => console.log("server is runnig on port 4000"))