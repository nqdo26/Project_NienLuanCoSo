const express = require('express');
const { createUser, handleLogin, getUser,
    getAccount,
    createAdmin
} = require('../controllers/userController');
const { createShoes, getListShoes, getShoesByIdForManage, getShoesByIdForEdit, updateShoes, deleteShoes } = require('../controllers/adminController');
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

routerAPI.post("/addproduct", createShoes)
routerAPI.get("/productmanage", delay, getListShoes)
routerAPI.get("/productmanage/:_id", delay, getShoesByIdForManage)
routerAPI.get("/editproduct/:_id", delay, getShoesByIdForEdit)
routerAPI.put("/editproduct/:_id", delay, updateShoes); 
routerAPI.delete("/productmanage/:_id", delay, deleteShoes);

module.exports = routerAPI; 
