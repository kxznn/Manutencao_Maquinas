const mongoose = require('mongoose');

const orderSchema = new mongoose.orderSchema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, ref:"User", require:true},
        items: [
            {
                productId: {type: String, required:true},
                qty: {type: Number, required:true, min:1}
            }
        ],
        notes:{Type:String}
    },
    {timesstamps:true}
);

module.exports = mongoose.model('Order', orderSchema);