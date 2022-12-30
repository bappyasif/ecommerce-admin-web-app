require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const routes = require("./routes");

app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://admin-ecommerce-client-side.vercel.app"
        // "https://admin-ecommerce-client-side-ip29e8v47-bappyasif.vercel.app"
    ],
    // default: "http://localhost:3000",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}))
app.use(routes)

app.listen(4000, () => console.log("server is runnig on port 4000"))