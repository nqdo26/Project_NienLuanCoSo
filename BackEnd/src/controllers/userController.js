const { createUserService, loginService, getUserService, createAdminService, addFavouriteService, getListFavouriteService, deleteFavouriteService, searchShoesByTitleService } = require("../services/userService");

const createAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    const data = await createAdminService(name, email, password);
    return res.status(200).json(data)
}

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const data = await createUserService(name, email, password);
    return res.status(200).json(data)
}

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    const data = await loginService(email, password);

    return res.status(200).json(data)
}

const getUser = async (req, res) => {
    const data = await getUserService();
    return res.status(200).json(data)
}

const getAccount = async (req, res) => {

    return res.status(200).json(req.user)
}


// Favourite

const addFavourite = async (req, res) => {
    const { title, tag, price, numberOfColors, shoesId } = req.body;
    const { email } = req.params;  // Lấy email từ URL params  

    try {
        const result = await addFavouriteService(email, title, tag, price, numberOfColors, shoesId);  
        
        if (result.EC === 0) {
            return res.status(200).json(result);  // Thành công
        } else if (result.EC === 3) {
            return res.status(200).json({ result });  
        } else {
            return res.status(400).json({ result });  
        }
    } catch (error) {
        console.error('Error adding favourite:', error);
        return res.status(500).json({ error: 'An error occurred while adding favourite' });
    }
};


const getListFavourite = async (req, res) => {
    const { email } = req.params;  
    try {
        const result = await getListFavouriteService(email);  
        if (result.EC === 0) {
            return res.status(200).json(result.data);  
        } else {
            return res.status(400).json({ error: result.EM });  
        }
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching favourites' });
    }
}

const deleteFavourite = async (req, res) => {
    const { _id } = req.body; 
    const data = await deleteFavouriteService(_id); 
    console.log('>>> Backend delete response:', data);
    return res.status(200).json(data); 
};

const searchShoesByTitle = async (req, res) => {
    const { title } = req.body;
    const data = await searchShoesByTitleService(title);
    return res.status(200).json(data);
};


module.exports = {
    createUser, handleLogin, getUser, getAccount, createAdmin, getListFavourite, addFavourite, deleteFavourite, searchShoesByTitle

}
