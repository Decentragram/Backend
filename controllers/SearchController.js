import User from "../models/user";
import catchAsync from "../utils/catchAsync";

class SearchController {
  static searchUser = catchAsync(async (req, res, next) => {
    try {
      const { searchText } = req.query;
      const users = await User.find({
        username: { $regex: searchText, $options: "i" },
      });
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      return next(new CustomErrorHandler(400, error.details[0].message));
    }
  });
}

export default SearchController;
