const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a product name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please enter a product description"],
    },
    price: {
      type: Number,
      required: [true, "Please enter a product price"],
      maxlength: [8, "Price cannot exceed 8 characters"],
    },
    rating: { type: Number, default: 0 },
    images: [{
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    }],
    category: {
      type: String,
      required: [true, "Please enter product category"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
      maxlength: [4, "Stock cannot exceed 4 characters"],
      default: 1,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
