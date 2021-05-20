const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    chosenToppings: [{
        _id: false,
        count: { type: Number, required: true },
        id: { type: Number, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true }
    }],
    totalPrice: { type: Number, required: true },
    date: { type: String, required: true },
    details: {
        address: { type: String, required: false },
        method: { type: String, required: true },
        name: { type: String, required: true },
        phone: { type: String, required: true },
    },
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
});

module.exports = mongoose.model('Order', orderSchema);