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
const { upload } = require('../controllers/cloudinaryController');

const routerAPI = express.Router();

routerAPI.get("/", (req, res) => {
    return res.status(200).json("Hello world api");
});

// USER
routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);
routerAPI.get("/user", auth, getUser);
routerAPI.get("/account", auth, getAccount);

// ADMIN
routerAPI.post("/admin", createAdmin);

// SHOES
routerAPI.post('/addproduct', auth, upload.array('images', 7), delay, createShoes); 
routerAPI.get("/productmanage", getListShoes);
routerAPI.get("/products", getListShoes);
routerAPI.get("/productmanage/:_id", getShoesByIdForManage);
routerAPI.get("/editproduct/:_id", auth, getShoesByIdForEdit);
routerAPI.put("/editproduct/:_id", auth, upload.array('images', 7), delay, updateShoes);
routerAPI.delete("/productmanage/:_id", auth, deleteShoes);

// FAVOURITE
routerAPI.post("/favourite/:email", auth, addFavourite);
routerAPI.get("/favourite/:email", auth, getListFavourite);
routerAPI.delete("/favourite", auth, deleteFavourite);

// SEARCH AND FILTER
routerAPI.get("/products/:type", getShoesByType);
routerAPI.get("/search", searchShoesByTitle);

// BAG
routerAPI.post("/bag/:email", auth, addBag);
routerAPI.get("/bag/:email", auth, getListBag);
routerAPI.delete("/bag", auth, deleteBag);

module.exports = routerAPI;