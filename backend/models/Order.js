const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    items: [
      {
        productId: { type: String, required: true, trim: true},
        qty: {type: Number,required: true, min: 1 },
      },
    ],
    notes: { type: String, trim: true},
  },
  {timestamps: true}
);

module.exports = mongoose.model("Order", orderSchema);
