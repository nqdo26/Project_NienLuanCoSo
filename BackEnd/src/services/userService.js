require("dotenv").config();

const User = require("../models/user");
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

module.exports = {
    createUserService, loginService, getUserService, createAdminService
}