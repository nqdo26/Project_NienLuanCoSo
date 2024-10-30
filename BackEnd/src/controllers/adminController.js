const { createShoesService, getListShoesService, getShoesByIdService} = require('../services/adminService')

const createShoes = async(req, res) =>  {
    const { title, tag, price, numberOfColors, colors, minSize, maxSize, description } = req.body
    
    const data = await createShoesService( title, tag, price, numberOfColors, colors, minSize, maxSize, description);
    return res.status(200).json(data)
}

const getListShoes = async(req, res) =>  {
    const data = await getListShoesService();
    return res.status(200).json(data)
}

const getShoesById = async (req, res) => {
    const { _id } = req.params;

    const data = await getShoesByIdService(_id);
    return res.status(200).json(data);
};


module.exports = {
    createShoes, getListShoes, getShoesById
}