import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET;

export function generarToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

export function verificarToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
}