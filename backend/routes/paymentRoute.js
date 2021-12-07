const express = require("express");
const {
  processPayment,
  sendStrypeApiKey,
} = require("../controllers/paymentController");
const router = express.Router();

const { isAuthenticateUser } = require("../middlewares/auth");

router.route("/payment/process").post(isAuthenticateUser, processPayment);
router.route("/stripeApiKey").get(isAuthenticateUser, sendStrypeApiKey);
module.exports = router;
