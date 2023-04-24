import User from "../models/user";
import HelperResponse from "../utils/HelperResponse";
import catchAsync from "../utils/catchAsync";
import CustomErrorHandler from "../utils/CustomErrorHandler";
import Relation from "../models/relations";
import Post from "../models/Post";

class UserController {
  static editProfile = catchAsync(async (req, res, next) => {
    const { name, email, phone, dob, interests, username } = req.body;

    if (!username || !name || !email || !phone || !dob) {
      return HelperResponse.error(res, "Please fill all fields", "invalid_fields");
    }

    if (username.length < 3) {
      return HelperResponse.error(
        res,
        "Username must be at least 3 characters",
        "invalid_username"
      );
    }

    let isUserExist = await User.findOne({
      username,
    });

    if (isUserExist) {
      return HelperResponse.error(res, "Username already exists", "username_exists");
    }

    const { _id } = req.user;

    let user = await User.findByIdAndUpdate(
      {
        _id,
      },
      {
        $set: {
          name,
          email,
          phone,
          dob,
          interests,
          username,
          isOnboarding: false,
        },
      },
      {
        new: true,
      }
    );

    return HelperResponse.success(res, "Profile updated successfully", user);
  });

  static getUser = catchAsync(async (req, res, next) => {
    const { _id } = req.user;

    let user = await User.findById(_id);

    return HelperResponse.success(res, "User", user);
  });

  static followUser = catchAsync(async (req, res, next) => {
    const { _id } = req.user;
    const { operation, id } = req.params;
    if (_id === id) {
      return next(new CustomErrorHandler(400, "You can't follow yourself"));
    }
    if (operation === "follow") {
      // const user = await User.findById(id);
      const user = await Relation.findById(id);

      console.log(user.followers);

      if (user.followers.includes(_id)) {
        return next(new CustomErrorHandler(400, "Already Following this user "));
      }

      const [follower, followed] = await Promise.all([
        Relation.findByIdAndUpdate(
          {
            _id: _id,
          },
          {
            $push: {
              followings: {
                _id: id,
              },
            },
          },
          {
            new: true,
          }
        ),
        Relation.findByIdAndUpdate(
          {
            _id: id,
          },
          {
            $push: {
              followers: {
                _id,
              },
            },
          },
          {
            new: true,
          }
        ),
      ]);

      // updating the followers and followings count
      await Promise.all([
        User.findByIdAndUpdate(
          {
            _id: _id,
          },
          {
            $set: {
              followingsCount: follower.followings.length,
            },
          },
          {
            new: true,
          }
        ),
        User.findByIdAndUpdate(
          {
            _id: id,
          },
          {
            $set: {
              followersCount: followed.followers.length,
            },
          },
          {
            new: true,
          }
        ),
      ]);

      //   await NotificationController.sendNotification(
      //     _id,
      //     id,
      //     "follow",
      //     "You have a new follower ",
      //     `${username} started following you`
      //   );

      return res.status(200).json({
        success: true,
        message: "User followed successfully",
      });
    } else if (operation === "unfollow") {
      const [unfollower, followed] = await Promise.all([
        Relation.findById({
          _id: _id,
        }),
        Relation.findById({
          _id: id,
        }),
      ]);

      if (unfollower.followings.includes(id)) {
        const index = unfollower.followings.findIndex((following) => {
          return following._id === id;
        });

        unfollower.followings.splice(index, 1);
        unfollower.save();

        const index2 = followed.followers.findIndex((follower) => {
          return follower._id === _id;
        });

        followed.followers.splice(index2, 1);
        followed.save();
      }

      // console.log(unfollower.followings, followed.followers);

      // updating the followers and followings count
      // if()
      const [boi, boi2] = await Promise.all([
        User.findByIdAndUpdate(
          {
            _id: _id,
          },
          {
            $set: {
              followingsCount: unfollower.followings.length,
            },
          },
          {
            new: true,
          }
        ),
        User.findByIdAndUpdate(
          {
            _id: id,
          },
          {
            $set: {
              followersCount: followed.followers.length,
            },
          },
          {
            new: true,
          }
        ),
      ]);

      // console.log(boi, "boi", boi2, "boi2");

      return res.status(200).json({
        success: true,
        message: "User unfollowed successfully",
      });
    }
  });

  static getUserById = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    let user = await User.findById(id).lean();

    // console.log(user);

    if (!user) {
      return next(new CustomErrorHandler(404, "User not found"));
    }

    let userFollowers = await Relation.findById(id).select("followers").lean();

    console.log(userFollowers);

    // user.isFollowing = user.followers.map(String).includes(req.user._id.toString());

    if (userFollowers) {
      user.isFollowing = userFollowers.followers.map(String).includes(req.user._id.toString());
    } else {
      user.isFollowing = false;
    }

    user.numberOfPosts = await Post.countDocuments({ userId: id });

    // user.numberOfPosts = user.PostIds.length;

    return HelperResponse.success(res, "User Details", user);
  });

  static FollowerList = catchAsync(async (req, res, next) => {
    try {
      const _id = req.params.id;

      let followersList = [];

      const currentUser = await Relation.findById(_id).populate(
        "followers",
        "name username profilePic"
      );

      console.log("currentUser", currentUser);

      followersList = currentUser.followers;

      return res.json({
        success: true,
        message: "followers found",
        data: {
          followersList,
        },
      });
    } catch (error) {
      console.log("error==>", error);
    }
  });

  static FollowingList = catchAsync(async (req, res, next) => {
    try {
      const _id = req.params.id;

      // console.log("id", _id);

      let followingList = [];

      const currentUser = await Relation.findById(_id).populate(
        "followings",
        "name username profilePic"
      );

      followingList = currentUser.followings;

      return res.json({
        success: true,
        message: "followings found",
        data: {
          followingList,
        },
      });
    } catch (error) {
      console.log("error==>", error);
    }
  });
  static;
}

export default UserController;
