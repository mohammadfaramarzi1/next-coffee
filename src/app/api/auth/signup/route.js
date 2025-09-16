import { connectToDb } from "@/configs/db";
import UserModel from "@/models/User";
import {
  generateAccessToken,
  hashPassword,
  validateEmail,
  validatePassword,
  validatePhone,
} from "@/utils/auth";
import { roles } from "@/utils/constants";

export async function POST(req) {
  await connectToDb();
  const body = await req.json();
  const { name, email, password, phone } = body;

  //users count
  const users = await UserModel.find();

  //validation

  if (!name.trim()) {
    return Response.json({ message: "Name is not valid", status: 422 });
  }

  if (!validatePhone(phone)) {
    return Response.json({ message: "Phone is not valid", status: 422 });
  }

  if (!validatePassword(password)) {
    return Response.json({ message: "Password is not valid", status: 422 });
  }

  if (email && !validateEmail(email)) {
    return Response.json({ message: "Email is not valid", status: 422 });
  }

  //isUserExists
  const isUserExists = await UserModel.findOne({
    $or: [{ name }, { email }, { phone }],
  });

  if (isUserExists) {
    return Response.json(
      {
        message: "User Already Exists",
      },
      {
        status: 422,
      }
    );
  }

  //hash password
  const hashedPassword = await hashPassword(password);

  //access token

  const accessToken = generateAccessToken({ name });

  //generate user
  await UserModel.create({
    name,
    phone,
    email,
    password: hashedPassword,
    role: users.length > 0 ? roles.USER : roles.ADMIN,
  });

  return Response.json(
    {
      message: "User created successfully",
    },
    {
      status: 201,
      headers: { "Set-Cookie": `token=${accessToken};path=/;httpOnly=true` },
    }
  );
}
