const express = require("express");
const {
  myOrders,
  newOrder,
  singleOrder,
  allOrdersAdmin,
  updateOrderAdmin,
  deleteOrderAdmin,
} = require("../controllers/orderController");
const { isAuthenticateUser, authorizedRoles } = require("../middlewares/auth");
const router = express.Router();

router.route("/order/new").post(isAuthenticateUser, newOrder);
router.route("/orders/me").get(isAuthenticateUser, myOrders);
router.route("/order/:id").get(isAuthenticateUser, singleOrder);

router
  .route("/admin/order/:id")
  .put(isAuthenticateUser, authorizedRoles("admin"), updateOrderAdmin)
  .delete(isAuthenticateUser, authorizedRoles("admin"), deleteOrderAdmin);

router
  .route("/admin/orders")
  .get(isAuthenticateUser, authorizedRoles("admin"), allOrdersAdmin);

module.exports = router;
