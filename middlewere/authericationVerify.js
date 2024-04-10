const jwt = require("jsonwebtoken");
const userModel = require("../mongodb/userSchema");
const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require("../error/errorHandler");

const tokenVerify = catchAsyncError(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return next(new ErrorHandler("please login first", 404));

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const user = await userModel.findById(decoded.id);

  if (!user) return next(new ErrorHandler("please login first", 404));

  req.user = user;
  next();
});

module.exports = tokenVerify;
