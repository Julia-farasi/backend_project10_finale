// middleware/authenticateToken.js
import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // "Bearer xyz"

  if (!token) {
    return res.status(401).json({ message: "Kein Token übergeben" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT Fehler:", err.message);
      return res.status(403).json({ message: "Token ungültig" });
    }

    req.user = decoded;
    next();
  });
};
