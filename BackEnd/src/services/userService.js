require("dotenv").config();

const User = require("../models/user");
const Favourite = require("../models/favourite");
const Shoes = require("../models/shoes");
const Bag = require('../models/bag');

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const createAdminService = async (name, email, password) => {
    try {
        //check user exist
        const user = await User.findOne({email});
        if(user) {
            console.log(`Email ${email} đã được sử dụng`);
            return {
                EC: 1, // Error code for email already exists
                EM: `${email} has already been used` 
            }
        }

        //hash user pw
        const hashPassword = await bcrypt.hash(password, saltRounds)
        //save user to database
        let result = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: "ADMIN"
        })
        return {
            EC: 0, // Success code
            EM: "Register success",
            data: result
        };

    } catch (error) {
        console.log(error);
        return {
            EC: 2, // General error code
            EM: "An error occurred"
        };
    }
}

const createUserService = async (name, email, password) => {
    try {
        //check user exist
        const user = await User.findOne({email});
        if(user) {
            console.log(`Email ${email} đã được sử dụng`);
            return {
                EC: 1, // Error code for email already exists
                EM: `${email} has already been used` 
            }
        }

        //hash user pw
        const hashPassword = await bcrypt.hash(password, saltRounds)
        //save user to database
        let result = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: "USER"
        })
        return {
            EC: 0, // Success code
            EM: "Register success",
            data: result
        };

    } catch (error) {
        console.log(error);
        return {
            EC: 2, // General error code
            EM: "An error occurred"
        };
    }
}

const loginService = async (email, password) => {
    try {
        //fetch user by email
        const user = await User.findOne({ email: email });
        if(user){
            //compare password
            const isMathPassword = await bcrypt.compare(password, user.password);
            if(!isMathPassword){
                return {
                    EC:2,
                    EM: "Email/Password khong hop le"
                }
            }else {
                //create an access token
                const payload = {
                     email: user.email,
                     name: user.name,
                     role: user.role
                }
                
                const access_token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRE
                    }
                 );
                return {
                    EC: 0,
                    access_token,
                    user: {
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        role: user.role
                    }
                };
            }
        }else {
            return {
                EC: 1,                            //error code
                EM: "Email/Password khong hop le" //error message
            }
        }


    } catch (error) {
        console.log(error);
        return null;
    }
}

const getUserService = async () => {
    try {
        
        let result = await User.find({}).select("-password");
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

// Favourite

const addFavouriteService = async (email, title, tag, price, numberOfColors, shoesId, image) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return {
                EC: 1,  
                EM: "User not found"
            };
        }

        const shoes = await Shoes.findOne({ _id: shoesId });
        if (!shoes ) {
            return {
                EC: 10,  
                EM: "Product not found"
            };
        }

        const existingFavourite = await Favourite.findOne({
            userId:  user._id,
            title: title,
        });


        if (existingFavourite) {
            console.log('Existing favourite check:', existingFavourite);

            return {
                EC: 3,  
                EM: "This favourite already exists"
            };
        }

        let result = await Favourite.create({
            title: title,
            image: image,
            tag: tag,
            price: price,
            numberOfColors: numberOfColors,
            userId: user._id,
            shoesId: shoes._id
        });

        return {
            EC: 0, 
            EM: "Favourite added successfully",
            data: result
        };

    } catch (error) {
        console.log(error);
        return {
            EC: 2,  
            EM: "An error occurred while adding favourite"
        };
    }
};

const getListFavouriteService = async (email) => {
    try {
        const user = await User.findOne({ email });
        console.log('User check:', user);
        if (!user) {
            return {
                EC: 1,
                EM: "User not found"
            };
        }
        const favourites = await Favourite.find({ userId: user._id });
        return {
            EC: 0,
            data: favourites
        };

    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: "An error occurred"
        };
    }
};

const deleteFavouriteService = async (_id) => {
    try {
        const favourite = await Favourite.findByIdAndDelete(_id);
        if (!favourite) {
            return {
                EC: 1,
                EM: `Product not found`,
                data: favourite
            };
        }
        return {
            EC: 0,
            EM: "remove form product favourite success",
            data: favourite
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: "An error occurred",
        };
    }
}

const searchShoesByTitleService = async (title) => {
    try {
        const shoes = await Shoes.find({ title: { $regex: title, $options: 'i' } });
        if (!shoes || shoes.length === 0) {
            return {
                EC: 1,
                EM: `Product ${title} not found`,
            };
        }
        return {
            EC: 0,
            EM: "Search product success",
            data: shoes,
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: "An error occurred",
        };
    }
};

//Bag

const addBagService = async (email, title, tag, size, price, number, color, shoesId, image) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return {
                EC: 1,  
                EM: "User not found"
            };
        }

        const shoes = await Shoes.findOne({ _id: shoesId });
        if (!shoes) {
            return {
                EC: 10,  
                EM: "Product not found"
            };
        }

        const existingBag = await Bag.findOne({
            userId: user._id,
            title: title,
            color: color,
            size: size,
        });

        if (existingBag) {
            existingBag.number += 1;
            await existingBag.save(); 

            return {
                EC: 3,  
                EM: "Product already exists, increased the number of products",
                data: existingBag
            };
        }

        let result = await Bag.create({
            title: title,
            image: image,
            tag: tag,
            size: size,
            price: price,
            number: number || 1, 
            color: color,
            userId: user._id,
            shoesId: shoes._id
        });

        return {
            EC: 0, 
            EM: "Bag added successfully",
            data: result
        };

    } catch (error) {
        console.log(error);
        return {
            EC: 2,  
            EM: "An error occurred while adding bag"
        };
    }
};

const deleteBagService = async (_id) => {
    try {
        const bag = await Bag.findByIdAndDelete(_id);
        if (!bag) {
            return {
                EC: 1,
                EM: `Product not found`,
                data: bag
            };
        }
        return {
            EC: 0,
            EM: "remove form product bag success",
            data: bag
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: "An error occurred",
        };
    }
}

const getListBagService = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return {
                EC: 1,
                EM: "User not found"
            };
        }

        const bag = await Bag.find({ userId: user._id });
        return {
            EC: 0,
            data: bag
        };

    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: "An error occurred"
        };
    }
};


module.exports = {
    createUserService, 
    loginService, 
    getUserService, 
    createAdminService,
    addFavouriteService, 
    getListFavouriteService, 
    deleteFavouriteService, 
    searchShoesByTitleService,  
    addBagService,
    deleteBagService,
    getListBagService,
    deleteBagService
}