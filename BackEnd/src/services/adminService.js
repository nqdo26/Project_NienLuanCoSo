const Shoes = require("../models/shoes");

const createShoesService = async (title, type, tag, price, numberOfColors, colors, minSize, maxSize, description, images) => {
    try {
        const shoes = await Shoes.findOne({ title });
        if (shoes) {
            console.log(`Product ${title} đã tồn tại`);
            return {
                EC: 1,
                EM: `Product ${title} has already been axisted`
            };
        }

        let result = await Shoes.create({
            title: title,
            type: type,
            tag: tag,
            price: price,
            numberOfColors: numberOfColors,
            colors: colors,
            minSize: minSize,
            maxSize: maxSize,
            description: description,
            images: images 
        });
        return {
            EC: 0,
            EM: "Create product success",
            data: result
        };
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

const getShoesByTypeService = async (type) => {
    try {
        let result = await Shoes.find({ type: type });
        return {
            EC: 0,
            EM: `Get ${type} shoes success`,
            data: result,
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: "An error occurred",
        };
    }
};

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

const updateShoesService = async (_id, updatedData, newImages) => {
    try {
        const shoes = await Shoes.findById(_id);
        if (!shoes) {
            return {
                EC: 1,
                EM: 'Product not found', 
            };
        }


        if (newImages.length > 0) {
            if (shoes.images && shoes.images.length > 0) {
                const oldImages = shoes.images;
                for (const imageUrl of oldImages) {
                    const publicId = imageUrl.split('/').pop().split('.')[0];
                    await cloudinary.uploader.destroy(`shoes_images/${publicId}`);
                }
            }
            updatedData.images = newImages; 
        }

        const updatedShoes = await Shoes.findByIdAndUpdate(_id, updatedData, { new: true });

        return {
            EC: 0,
            EM: 'Update product success',
            data: updatedShoes,
        };
    } catch (error) {
        console.error(error);
        return {
            EC: 2,
            EM: 'An error occurred during update', 
        };
    }
};


const deleteShoesService = async (_id) => {
    try {
        const shoes = await Shoes.findByIdAndDelete(_id);
        if (!shoes) {
            return {
                EC: 1,
                EM: `Product not found`,
            };
        }
        return {
            EC: 0,
            EM: "Delete product success",
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: "An error occurred",
        };
    }
}

module.exports = {
    createShoesService, getListShoesService, getShoesByIdService, updateShoesService, deleteShoesService, getShoesByTypeService
}
