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

const getShoesService = async () => {
    try {
        let result = await Shoes.find({});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}


module.exports = {
    createShoesService, getShoesService
}
