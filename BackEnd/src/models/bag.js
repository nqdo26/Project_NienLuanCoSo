const mongoose = require('mongoose');

const bagSchema = new mongoose.Schema({
    title: String,
    tag: String,
    size: String,
    price: Number,
    number: Number,
    color: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    shoesId: { type: mongoose.Schema.Types.ObjectId, ref: 'shoes' },
    image: String,
});

const Bag = mongoose.model('bag', bagSchema);

module.exports = Bag;
