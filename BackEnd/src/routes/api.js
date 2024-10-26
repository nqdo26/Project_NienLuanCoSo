const express = require('express');
const { createUser, handleLogin, getUser,
    getAccount,
    createAdmin
} = require('../controllers/userController');
const auth = require('../middleware/auth');
const delay = require('../middleware/delay');
const { create } = require('../models/user');

const routerAPI = express.Router();

routerAPI.all("*", auth);

routerAPI.get("/", (req, res) => {
    return res.status(200).json("Hello world api")
})

routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);
routerAPI.post("/admin", createAdmin);

routerAPI.get("/user", getUser);
routerAPI.get("/account", delay, getAccount);




module.exports = routerAPI; //export default
