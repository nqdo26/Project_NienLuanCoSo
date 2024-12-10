const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'shoes_images',
        format: async (req, file) => 'png', 
        public_id: (req, file) => file.originalname,
    },
});

const upload = multer({ storage: storage });

const uploadImage = async (req, res) => {
    try {
        const imageUrl = req.file.path; 

        res.json({ url: imageUrl });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading image');
    }
};

module.exports = { upload, uploadImage };