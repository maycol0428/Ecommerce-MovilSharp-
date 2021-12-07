const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrros");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Jimp = require("jimp");
const path = require("path");
// ################################################################################
const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;
  // Image Base64
  let public_id = "Profile_default.png";
  if (avatar) {
    const buffer = Buffer.from(
      avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );
    public_id = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;
    try {
      const jimResp = await Jimp.read(buffer);
      jimResp
        .resize(150, Jimp.AUTO)
        .write(path.resolve(__dirname, `../storage/users/${public_id}`));
    } catch (err) {
      return next(new ErrorHandler("Could not process the image", 500));
    }
  }
  // 32478362874-3242342342343432.png
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id,
      url: `/storage/users/${public_id}`,
    },
  });

  sendToken(user, 201, res);
});
// ################################################################################
const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  // checking if user has given password and email both
  if (!email || !password) {
    return next(new ErrorHandler("Please enter your email & password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPassworWordMatched = await user.comparePassword(password);
  if (!isPassworWordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});
// ################################################################################
const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: "Logged Out" });
});
// ################################################################################
const resetPassword = catchAsyncErrors(async (req, res, next) => {

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");


  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    next(
      new ErrorHandler(
        "Reset Password token is invalid or has been expired",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});
// ################################################################################
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    next(new ErrorHandler("User not found", 404));
  }
  // Get reset password Token
  const resetToken = await user.generateResetPassword();
  await user.save({ validateBeforeSave: false });
  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/password/reset/${resetToken}`;
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce Password Recovery",
      url: resetPasswordUrl,
    });

    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} successfully`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(err.message, 500));
  }
});
// ################################################################################
const details = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, user });
});
// ################################################################################
const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPassworWordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPassworWordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 401));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 401));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});
// ################################################################################
const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  // TODO Agregar el cambio de imagen
  // we will add cloudinary later
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true });
});
// ################################################################################
// Admin
const allUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ success: true, users });
});
// ################################################################################
// Admin
const singleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with id: ${req.params.id}`)
    );
  }
  res.status(200).json({ success: true, user });
});
// ################################################################################
// Admin
const updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  // TODO: we will add cloudinary later
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true });
});
// ################################################################################
// Admin
const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  // TODO: we will remove cloudinary later
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with id: ${req.params.id}`)
    );
  }
  await user.remove();
  res
    .status(200)
    .json({ success: true, message: "User deleted successfully." });
});
// ################################################################################
module.exports = {
  register,
  login,
  logout,
  resetPassword,
  forgotPassword,
  details,
  updatePassword,
  updateProfile,
  allUsers,
  singleUser,
  deleteUser,
  updateUserProfile,
};
