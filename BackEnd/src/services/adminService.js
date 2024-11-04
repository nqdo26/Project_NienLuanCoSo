const Shoes = require("../models/shoes");

const createShoesService = async (title, tag, price, numberOfColors, colors, minSize, maxSize, description) => {
    try {
        const shoes = await Shoes.findOne({title});
        if(shoes) {
            console.log(`Product ${title} đã tồn tại`);
            return {
                EC: 1,
                EM: `Product ${title} has already been axisted`
            }
        }

        let result = await Shoes.create({
            title: title,
            tag: tag,
            price: price,
            numberOfColors: numberOfColors,
            colors: colors, 
            minSize: minSize,
            maxSize: maxSize,
            description: description
        });
        return {
            EC: 0,
            EM: "Create product success",
            data: result
        }
    } catch (error) {
        console.log(error);
        return {
            EC: 2, 
            EM: "An error occurred"
        };
    }
};

const getListShoesService = async () => {
    try {
        let result = await Shoes.find({});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getShoesByIdService = async (_id) => {
    try {
        const shoes = await Shoes.findOne({ _id});
        if (!shoes) {
            return {
                EC: 1,
                EM: `Product ${title} not found`,
            };
        }
        return {
            EC: 0,
            EM: "Get product success",
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

const updateShoesService = async (_id, updatedData) => {
    try {
        const shoes = await Shoes.findByIdAndUpdate(_id, updatedData, { new: true });
        if (!shoes) {
            return {
                EC: 1,
                EM: `Product not found`,
            };
        }
        return {
            EC: 0,
            EM: "Update product success",
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



module.exports = {
    createShoesService, getListShoesService, getShoesByIdService, updateShoesService,
}
