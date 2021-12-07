const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    shippingInfo: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      pinCode: { type: String, required: true },
      phoneNo: { type: String, required: true },
    },
    orderItems: [
      {
        name: { type: String, required: true },
        price: { type: String, required: true },
        quantity: { type: String, required: true },
        image: { type: String, required: true },
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    paymentInfo: {
      id: { type: String, required: true },
      status: { type: String, required: true },
    },
    paidAt: { type: Date, required: true },
    itemsPrice: { type: Number, default: 0, required: true },
    taxPrice: { type: Number, default: 0, required: true },
    shippingPrice: { type: Number, default: 0, required: true },
    totalPrice: { type: Number, default: 0, required: true },
    orderStatus: { type: String, default: "Processing", required: true },
    deliverdAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
