import { hash, compare } from "bcryptjs";
import { verify, sign } from "jsonwebtoken";

export const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

export const verifyPassword = async (password, hashedPassword) => {
  const isValid = compare(password, hashedPassword);
  return isValid;
};

export const generateAccessToken = (data) => {
  const token = sign({ ...data }, process.env.ACEESS_TOKEN_SECRET_KEY, {
    expiresIn: "60s",
  });
  return token;
};

export const verifyAccessToken = (token) => {
  try {
    const tokenPayload = verify(token, process.env.ACEESS_TOKEN_SECRET_KEY);
    return tokenPayload;
  } catch (error) {
    console.log(`Verify access token error => ${error}`);
    return false;
  }
};

export const generateRefreshToken = (data) => {
  const token = sign({ ...data }, process.env.REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: "15d",
  });
  return token;
};
