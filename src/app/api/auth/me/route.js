import connectToDB from "@/configs/db";
import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";
import UserModel from "@/models/User";

export async function GET() {
  await connectToDB();

  const token = cookies().get("token")?.value;
  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  let user = null;

  try {
    const payload = verifyAccessToken(
      token,
      process.env.ACEESS_TOKEN_SECRET_KEY
    );
    if (payload) {
      user = await UserModel.findOne(
        { email: payload.email },
        "-__v -password -refreshToken"
      );
    }
    return Response.json({ user });
  } catch (err) {
    return Response.json(
      { message: "Unkwon internal server error" },
      { status: 500 }
    );
  }
}
