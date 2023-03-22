class CustomErrorHandler extends Error {
  constructor(status, msg) {
    super();
    this.status = status;
    this.message = msg;
  }
  // if (err) {
  //     return res.json({
  //       success: false,
  //       errors: {
  //         title: "Image Upload Error",
  //         detail: err.message,
  //         error: err,
  //       },
  //     });
  static invalidEmailPattern(
    message = {
      success: false,
      message: "Given email pattern does not match. Please enter valid email",
    }
  ) {
    return new CustomErrorHandler(500, message);
  }

  static emailAlreadyExist(
    message = { success: false, message: "This email is already used. Try another Email." }
  ) {
    return new CustomErrorHandler(409, message);
  }
  static emailNotVerifeid(
    message = { success: false, message: "First verify your Email Id", isVerified: false }
  ) {
    return new CustomErrorHandler(401, message);
  }
  static emailNotExist(
    message = { success: false, message: "Provided email does not exist. Kindly check your email." }
  ) {
    return new CustomErrorHandler(401, message);
  }
  static addEmail(message = { success: false, message: "First add your Email ID" }) {
    return new CustomErrorHandler(401, message);
  }
  static UserdoesnotExist(message = { success: false, message: "User does not exist" }) {
    return new CustomErrorHandler(404, message);
  }

  // phone number related error/issues or possibilites

  static invalidPhoneNumberPattern(
    message = {
      success: false,
      message: "Given phone number pattern does not match. Please enter valid Phone Number",
    }
  ) {
    return new CustomErrorHandler(500, message);
  }

  static phoneNumberAlreadyExist(
    message = {
      success: false,
      message: "This Phone Number is already used. Try another Phone Number.",
    }
  ) {
    return new CustomErrorHandler(409, message);
  }

  static phoneNumberNotVerifeid(
    message = {
      success: false,
      message: "Phone number not verified! Please verify your number to continue",
      isVerified: false,
    }
  ) {
    return new CustomErrorHandler(401, message);
  }
  static phoneNumberNotExist(
    message = {
      success: false,
      message: "Provided Phone Number does not exist. Kindly check your Phone Number.",
    }
  ) {
    return new CustomErrorHandler(401, message);
  }
  static phoneNumberNotAdded(message = { success: false, message: "First add your Phone Number" }) {
    return new CustomErrorHandler(401, message);
  }

  // password related error/issues or possibilites
  static invalidPasswordPattern(
    message = {
      success: false,
      message:
        "password shouled be 8 of digit  and atleast contain one uppercase, one lowercase, one integer and one symbol.",
    }
  ) {
    return new CustomErrorHandler(401, message);
  }
  static wrongPassword(
    message = { success: false, message: "Password did not match. Kinldy check your Password." }
  ) {
    return new CustomErrorHandler(401, message);
  }

  static serverError(message = { success: false, message: "Internal server error" }) {
    return new CustomErrorHandler(500, message);
  }

  // otp related error/issues or possibilites

  static invalidOtp(message = { success: false, message: "Token has expired or invalid" }) {
    return new CustomErrorHandler(500, message);
  }
  // file related error/issues or possibilites
  static invalidFileType(
    message = {
      success: false,
      message: "Invalid file type. Only support .png, .jpg, .jpeg, .gif extension file",
    }
  ) {
    return new CustomErrorHandler(500, message);
  }
  static fileSizeTooLarge(
    message = { success: false, message: "File size maximum can be 1MB 1024KB." }
  ) {
    return new CustomErrorHandler(500, message);
  }
  static fileNotFound(message = { success: false, message: "File does not exist" }) {
    return new CustomErrorHandler(500, message);
  }
  // account success
  static unAuthorized(
    message = { success: false, message: "It looks like you are unAuthorized user." }
  ) {
    return new CustomErrorHandler(500, message);
  }

  static accountNotActive(message = { success: false, message: "This account is deactivated." }) {
    return new CustomErrorHandler(500, message);
  }

  static loginerror(provider) {
    return new CustomErrorHandler(500, {
      success: false,
      message: `You have registered using ${provider}.Kindly use the same to login or use forget password`,
    });
  }

  static customError(
    message = {
      success: false,
      message: "Something went wrong",
    }
  ) {
    return new CustomErrorHandler(500, message);
  }
}

export default CustomErrorHandler;
