const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
    title: String,
    tag: String,
    price: Number, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' } 
});

const Favourite = mongoose.model('favourite', favouriteSchema);

module.exports = Favourite;
