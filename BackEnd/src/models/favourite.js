const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
    title: String,
    tag: String,
    price: Number, 
    numberOfColors: Number, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    shoesId: { type: mongoose.Schema.Types.ObjectId, ref: 'shoes' },
    image: String,
});

const Favourite = mongoose.model('favourite', favouriteSchema);

module.exports = Favourite;
