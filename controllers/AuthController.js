import User from "../models/user";
import catchAsync from "../utils/catchAsync";
import HelperResponse from "../utils/HelperResponse";
import { recoverPersonalSignature } from "@metamask/eth-sig-util";
import JwtService from "../utils/JwtService";

const Web3 = require("web3");

const isValidEthAddress = (address) => Web3.utils.isAddress(address);

const makeId = (length) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
const isValidSignature = (address, signature, messageToSign) => {
  if (!address || typeof address !== "string" || !signature || !messageToSign) {
    return false;
  }

  const signingAddress = recoverPersonalSignature({
    data: messageToSign,
    signature,
  });

  if (!signingAddress || typeof signingAddress !== "string") {
    return false;
  }

  return signingAddress.toLowerCase() === address.toLowerCase();
};
class AuthController {
  static getMessageToSign = catchAsync(async (req, res, next) => {
    try {
      const { address } = req.query;

      if (!isValidEthAddress(address)) {
        return HelperResponse.error(res, "Invalid Ethereum address", "invalid__address");
      }

      const randomString = makeId(20);
      let messageToSign = `Wallet address: ${address} Nonce: ${randomString}`;

      // Get user data from firestore database
      let user;
      user = await User.findOne({ wallet_address: address });
      console.log("user", user);

      if (user && user.message_to_sign) {
        // messageToSign already exists for that particular wallet address
        console.log("messageToSign already exists for that particular wallet address");
        messageToSign = user.message_to_sign;
      } else {
        // messageToSign doesn't exist, save it to firestore database
        console.log(messageToSign);
        user = await User.create({
          wallet_address: address,
          message_to_sign: messageToSign,
        });
      }

      return HelperResponse.success(res, "Message to sign", messageToSign);
    } catch (error) {
      console.log(error);
      return res.send({ error: "server_error" });
    }
  });

  static loginUser = catchAsync(async (req, res, next) => {
    try {
      const { address, signature } = req.body;

      if (!isValidEthAddress(address) || !signature) {
        return HelperResponse.error(
          res,
          "Invalid Ethereum address or signature",
          "invalid__address"
        );
      }

      let user = await User.findOne({ wallet_address: address });
      const access_token = JwtService.sign({ address });

      if (!user) {
        return HelperResponse.error(res, "User not found", "user_not_found");
      }

      console.log("user", user);

      const messageToSign = user.message_to_sign;

      if (!messageToSign) {
        return HelperResponse.error(res, "Message to sign not found", "invalid_message_to_sign");
      }

      const validSignature = isValidSignature(address, signature, messageToSign);

      if (!validSignature) {
        return HelperResponse.error(res, "Invalid signature", "invalid_signature");
      }

      // Delete messageToSign as it can only be used once
      user.messageToSign = null;
      await user.save();

      return HelperResponse.success(res, "Login successful", { access_token, user });
    } catch (err) {
      console.log("Error:", err);
      return res.send({ error: "server_error" });
    }
  });
}

export default AuthController;
