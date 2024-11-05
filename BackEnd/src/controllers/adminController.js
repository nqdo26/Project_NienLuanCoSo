const { createShoesService, getListShoesService, getShoesByIdService, updateShoesService, deleteShoesService} = require('../services/adminService')

const createShoes = async(req, res) =>  {
    const { title, tag, price, numberOfColors, colors, minSize, maxSize, description } = req.body
    
    const data = await createShoesService( title, tag, price, numberOfColors, colors, minSize, maxSize, description);
    return res.status(200).json(data)
}

const getListShoes = async(req, res) =>  {
    const data = await getListShoesService();
    return res.status(200).json(data)
}

const getShoesByIdForManage = async (req, res) => {
    const { _id } = req.params;

    const data = await getShoesByIdService(_id);
    return res.status(200).json(data);
};

const getShoesByIdForEdit = async (req, res) => {
    const { _id } = req.params;

    const data = await getShoesByIdService(_id);
    return res.status(200).json(data);
};

const updateShoes = async (req, res) => {
    const { _id } = req.params; 
    const updatedData = req.body; 
    
    const data = await updateShoesService(_id, updatedData); 
    return res.status(200).json(data); 
};

const deleteShoes = async (req, res) => {
    const { _id } = req.params; 
    const data = await deleteShoesService(_id); 
    return res.status(200).json(data); 
};



module.exports = {
    createShoes, getListShoes, getShoesByIdForManage, getShoesByIdForEdit, updateShoes, deleteShoes
}