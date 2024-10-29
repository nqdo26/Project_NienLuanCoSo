const { createShoesService, getShoesService } = require('../services/adminService')

const createShoes = async(req, res) =>  {
    const { title, tag, price, numberOfColors, colors, minSize, maxSize, description } = req.body
    
    const data = await createShoesService( title, tag, price, numberOfColors, colors, minSize, maxSize, description);
    return res.status(200).json(data)
}

const getShoes = async(req, res) =>  {
    const data = await getShoesService();
 
    return res.status(200).json(data)
}

module.exports = {
    createShoes, getShoes
}