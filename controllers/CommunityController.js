import CustomErrorHandler from "../utils/CustomErrorHandler";
import catchAsync from "../utils/catchAsync";
import joi from "joi";
import uploadFile from "../utils/cloudinary";

import Community from "../models/Community";

class CommunityController {
  static createCommunity = catchAsync(async (req, res, next) => {
    try {
      console.log(req.body, "bodycreatecommunity");
      const { _id } = req.user;
      let { name, description } = req.body;

      const schema = joi.object({
        name: joi.string(),
        description: joi.string(),
      });

      const { error } = schema.validate({ name, description });
      if (error) {
        return next(new CustomErrorHandler(400, error.details[0].message));
      }

      let images = [];

      let filedata;

      if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
          //   add logic to upload file and store in media array
          filedata = await uploadFile(req.files[i].buffer);

          if (!filedata) {
            return res
              .status(500)
              .send("Error while uploading file. Try again later.");
          }

          images.push({
            url: filedata.secure_url,
            type: req.files[i].mimetype,
          });
        }
      }

      const newCommunity = await Community.create({
        name,
        description,
        images,
        createdBy: _id,
      });

      res.status(201).json({
        success: true,
        data: newCommunity,
      });
    } catch (error) {
      return next(new CustomErrorHandler(400, error.message));
    }
  });

  static createCommunityPost = catchAsync(async (req, res, next) => {
    try {
      const { _id } = req.user;
      let { caption, tags, community_id } = req.body;
      // let _id = "6446e95f938c2cc063302e4d";
      console.log(req.body, "bodycreatepost", req.files);
      tags = tags.join(",");
      const schema = joi.object({
        caption: joi.string(),

        tags: joi.string(),
      });
      const { error } = schema.validate({ caption, tags });
      if (error) {
        return next(new CustomErrorHandler(400, error.details[0].message));
      }

      let media = [];
      let filedata;

      if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
          //   add logic to upload file and store in media array
          filedata = await uploadFile(req.files[i].buffer);

          if (!filedata) {
            return res
              .status(500)
              .send("Error while uploading file. Try again later.");
          }

          media.push({
            url: filedata.secure_url,
            type: req.files[i].mimetype,
          });
        }
      }

      tags = tags.split(",");

      for (let i = 0; i < tags.length; i++) {
        tags[i] = String(tags[i]).slice(1).toLowerCase();
      }

      // Logic for tagged users
      console.log(community_id);
      const newPost = await Community.findByIdAndUpdate(
        { _id: community_id },
        {
          $push: {
            posts: {
              userId: _id,
              caption,
              tags,
              media,
            },
          },
        }
      );

      return res.status(200).json({
        success: true,
        data: newPost,
      });
    } catch (error) {
      return next(new CustomErrorHandler(400, error.message));
    }
  });

  static getAllCommunity = catchAsync(async (req, res, next) => {
    const communities = await Community.find({});

    res.status(200).json({
      success: true,
      data: communities,
    });
  });

  static getCommunityById = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const community = await Community.findById(id);
    console.log(community);

    res.status(200).json({
      success: true,
      data: community,
    });
  });

  static joinCommunity = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { _id } = req.user;

    const community = await Community.findById(id);

    if (!community) {
      return next(new CustomErrorHandler(400, "Community does not exist"));
    }

    const isAlreadyJoined = await Community.findOne({
      _id: id,
      members: { $in: [_id] },
    });

    if (isAlreadyJoined) {
      return res.status(200).json({
        success: true,
        message: "Already joined",
      });
    }

    const updatedCommunity = await Community.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $push: {
          members: _id,
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      data: updatedCommunity,
    });
  });

  static getJoinedCommunities = catchAsync(async (req, res, next) => {
    try {
      const { _id } = req.user;
      const communities = await Community.find({ members: { $in: [_id] } });
      res.status(200).json({
        success: true,
        data: communities,
      });
    } catch (error) {
      return next(new CustomErrorHandler(400, "Internal Server Error"));
    }
  });
}

export default CommunityController;
