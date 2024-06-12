import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/ErrorHandling.js";
import db_connection from "../../DB/connection.js";

const isAuthenticated = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization?.startsWith(process.env.BEARER_KEY)) {
    return res.status(400).json({ message: "In-valid bearer key" });
  }

  const token = authorization.split(process.env.BEARER_KEY)[1];

  if (!token) {
    return res.status(400).json({ message: "In-valid token" });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.TOKEN_SIGNATURE);
  } catch (error) {
    return res.status(401).json({ message: "In-valid token payload" });
  }

  if (!decoded?.id) {
    return res.status(401).json({ message: "In-valid token payload" });
  }

  const userId = decoded.id;

  try {
    // Query to get user from Member Table
    const [memberResult] = await db_connection.execute("SELECT * FROM member WHERE id = ?", [userId]);

    // Query to get user from Trainer Table
    const [trainerResult] = await db_connection.execute("SELECT * FROM trainer WHERE id = ?", [userId]);

    // Check if user exists
    const authAdmin = memberResult[0] || trainerResult[0];

    if (!authAdmin) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = authAdmin;
    return next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
});

export default isAuthenticated;
