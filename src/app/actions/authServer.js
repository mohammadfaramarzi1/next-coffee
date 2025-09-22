import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import UserModel from "@/models/User";
import connectToDB from "@/configs/db";

export const authUser = async () => {
  await connectToDB();

  const token = cookies().get("token")?.value;
  if (!token) return null;

  try {
    const payload = verify(token, process.env.ACEESS_TOKEN_SECRET_KEY);
    const user = await UserModel.findOne({ email: payload.email });
    return user;
  } catch (err) {
    console.log("Auth User Error ->", err);
    return null;
  }
};
