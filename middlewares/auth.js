import User from "../models/user";
import CustomErrorHandler from "../utils/CustomErrorHandler";
import JwtService from "../utils/JwtService";
import catchAsync from "../utils/catchAsync";

const auth = catchAsync(async (req, res, next) => {
  let authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new CustomErrorHandler(403, "UnAuthorized Access"));
  }
  const token = authHeader.split(" ")[1];
  // console.log(token);
  try {
    const { _id } = await JwtService.verify(token);

    console.log(_id);

    let user = await User.findById(_id);
    console.log(user);

    req.user = {
      _id,
      email: user.email,
      phone: user.phone,
      username: user.username,
      wallet_address: user.wallet_address,
    };
    next();
  } catch (err) {
    console.log(err);
    return next(new CustomErrorHandler(403, "Unauthorized Access"));
  }
});
export default auth;
