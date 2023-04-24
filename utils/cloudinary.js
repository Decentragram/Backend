const cloudinary = require("cloudinary").v2;
const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET } = require("../config");
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET,
});

let uploadFromBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloudinary.uploader.upload_stream(
      {
        folder: "uploads",
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(cld_upload_stream);
  });
};

const uploadFile = async (buffer) => {
  try {
    let result = await uploadFromBuffer(buffer);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default uploadFile;
