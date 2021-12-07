const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrros");
const ApiFeatures = require("../utils/apiFeatures");
// ################################################################################
const create = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

// ################################################################################

const all = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

const allProductsAdmin = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});
// ################################################################################
const detail = catchAsyncErrors(async (req, res, next) => {
  let id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({ success: true, product });
});
// ################################################################################
// admin
const update = catchAsyncErrors(async (req, res, next) => {
  let id = req.params.id;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  // Images Start Here
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({ success: true, product });
});
// ################################################################################
const remove = catchAsyncErrors(async (req, res, next) => {
  let id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully." });
});
// ################################################################################
// Create new Review or Update the review
const createReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    isReviewed.rating = rating;
    isReviewed.comment = comment;
    isReviewed.name = req.user.name;
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  const reducer = (prev, { rating: currentValue }) => prev + currentValue;
  let avg = product.reviews.reduce(reducer, 0);

  product.rating = avg / product.reviews.length;
  await product.save({ validateBeforeSave: true });
  res.status(200).json({ success: true });
});
// ################################################################################
// get All Reviews of product
const productReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) return next(new ErrorHandler("Product not found", 404));
  res.status(200).json({ success: true, reviews: product.reviews });
});
// ################################################################################
// Delete review
const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) return next(new ErrorHandler("Product not found", 404));
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  const reducer = (prev, { rating: currentValue }) => prev + currentValue;
  let avg = reviews.reduce(reducer, 0);

  const rating = ~~(avg / reviews.length);
  const numOfReviews = reviews.length;
  const p = await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      rating,
      numOfReviews,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({ success: true });
});
// ################################################################################
module.exports = {
  all,
  create,
  update,
  remove,
  detail,
  createReview,
  productReviews,
  deleteReview,
  allProductsAdmin,
};
