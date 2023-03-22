import { JWT_SECRET } from "../config";
const jwt = require("jsonwebtoken");

class JwtService {
  static sign(payload, expiry = "1y") {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: expiry });
  }
  static verify(token, secret = JWT_SECRET) {
    return jwt.verify(token, secret);
  }

  static signRefreshToken(payload, secret = JWT_SECRET, expiry = "7d") {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }
  static verifyRefreshToken(token, secret = JWT_SECRET) {
    return jwt.verify(token, secret);
  }
}

export default JwtService;
