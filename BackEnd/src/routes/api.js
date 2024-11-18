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
const { upload } = require('../controllers/cloudinaryController');

const routerAPI = express.Router();

routerAPI.all("*", auth);

routerAPI.get("/", (req, res) => {
    return res.status(200).json("Hello world api")
})

//USER
routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);
routerAPI.get("/user", getUser);
routerAPI.get("/account", getAccount);

//ADMIN
routerAPI.post("/admin", createAdmin);

//SHOES

routerAPI.post('/addproduct', upload.array('images', 7), createShoes); 
routerAPI.get("/productmanage", getListShoes)
routerAPI.get("/products", getListShoes)
routerAPI.get("/productmanage/:_id", getShoesByIdForManage)
routerAPI.get("/editproduct/:_id", getShoesByIdForEdit)
routerAPI.put("/editproduct/:_id", updateShoes); 
routerAPI.delete("/productmanage/:_id", deleteShoes);

//FAVOURITE
routerAPI.post("/favourite/:email", addFavourite);
routerAPI.get("/favourite/:email", getListFavourite);
routerAPI.delete("/favourite", deleteFavourite);

//SEARCH AND FILTER
routerAPI.get("/products/:type", getShoesByType);
routerAPI.get("/search", searchShoesByTitle);

//BAG
routerAPI.post("/bag/:email", addBag);
routerAPI.get("/bag/:email", getListBag);
routerAPI.delete("/bag", deleteBag);

module.exports = routerAPI; 