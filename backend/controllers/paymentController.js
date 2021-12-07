const catchAsyncErrros = require("../middlewares/catchAsyncErrros");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrros(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "PEN",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: paymentIntent.client_secret });
});
exports.sendStrypeApiKey = catchAsyncErrros(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_PUBLIC_KEY });
});
