const express = require("express");
const userController = require("../controllers/userController");
const { isAuthenticateUser, authorizedRoles } = require("../middlewares/auth");
const router = express.Router();
// ########################################################################################
// Acount User Routes
router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/logout").get(userController.logout);

router.route("/password/forgot").post(userController.forgotPassword);
router.route("/password/reset/:token").put(userController.resetPassword);
router
  .route("/password/update")
  .put(isAuthenticateUser, userController.updatePassword);

router.route("/me").get(isAuthenticateUser, userController.details);

router
  .route("/me/update")
  .put(isAuthenticateUser, userController.updateProfile);

// ########################################################################################
// Admin Routes
router
  .route("/admin/users")
  .get(isAuthenticateUser, authorizedRoles("admin"), userController.allUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticateUser, authorizedRoles("admin"), userController.singleUser)
  .put(
    isAuthenticateUser,
    authorizedRoles("admin"),
    userController.updateUserProfile
  )
  .delete(
    isAuthenticateUser,
    authorizedRoles("admin"),
    userController.deleteUser
  );

// ########################################################################################
module.exports = router;
