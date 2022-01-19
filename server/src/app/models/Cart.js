const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cart = new Schema({
    id:{ type: String, requried:true},
    name: { type: String, requried:true },
    image: { type: String, requried:true },
    quantity: { type: Number, requried:true,default:1 },
    price: { type: Number,  requried:true },
    total:{ type: Number, requried:true},
    username: { type: String,require:true}
},{
    timestamps: true,
});

module.exports = mongoose.model('Cart', Cart);