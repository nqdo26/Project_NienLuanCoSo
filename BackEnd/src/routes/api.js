const express = require('express');
const { createUser, handleLogin, getUser,
    getAccount,
    createAdmin,
    addFavourite,
    getListFavourite,
    deleteFavourite,
    searchShoesByTitle,
    addBag,
    getListBag,
    deleteBag
} = require('../controllers/userController');
const { createShoes, getListShoes, getShoesByIdForManage, getShoesByIdForEdit, updateShoes, deleteShoes, getShoesByType } = require('../controllers/adminController');
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
routerAPI.get("/account", getAccount);

routerAPI.post("/addproduct", createShoes)
routerAPI.get("/productmanage", getListShoes)
routerAPI.get("/products", getListShoes)
routerAPI.get("/productmanage/:_id", getShoesByIdForManage)
routerAPI.get("/editproduct/:_id", getShoesByIdForEdit)
routerAPI.put("/editproduct/:_id", updateShoes); 
routerAPI.delete("/productmanage/:_id", deleteShoes);
routerAPI.post("/favourite/:email", addFavourite);
routerAPI.get("/favourite/:email", getListFavourite);
routerAPI.delete("/favourite", deleteFavourite);
routerAPI.get("/products/:type", getShoesByType);
routerAPI.get("/search", searchShoesByTitle);
routerAPI.post("/bag/:email", addBag);
routerAPI.get("/bag/:email", getListBag);
routerAPI.delete("/bag", deleteBag);

module.exports = routerAPI; 