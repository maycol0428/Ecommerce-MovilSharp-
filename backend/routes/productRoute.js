const express = require("express");
const productController = require("../controllers/productController");
const { isAuthenticateUser, authorizedRoles } = require("../middlewares/auth");
const router = express.Router();

// Product routes
router.route("/products").get(productController.all);
router
  .route("/admin/products")
  .get(
    isAuthenticateUser,
    authorizedRoles("admin"),
    productController.allProductsAdmin
  );
router
  .route("/admin/product/new")
  .post(isAuthenticateUser, authorizedRoles("admin"), productController.create);
router
  .route("/admin/product/:id")
  .put(isAuthenticateUser, authorizedRoles("admin"), productController.update);
router
  .route("/admin/product/:id")
  .delete(
    isAuthenticateUser,
    authorizedRoles("admin"),
    productController.remove
  );
router.route("/product/:id").get(productController.detail);

router.route("/review").put(isAuthenticateUser, productController.createReview);
router
  .route("/reviews")
  .get(isAuthenticateUser, productController.productReviews)
  .delete(isAuthenticateUser, productController.deleteReview);

module.exports = router;
