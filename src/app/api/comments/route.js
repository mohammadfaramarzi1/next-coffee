import connectToDB from "@/configs/db";
import CommentModel from "@/models/Comment";
import ProductModel from "@/models/Product";
import { validateEmail } from "@/utils/auth";

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const { username, body: reqBody, email, score, product } = body;
    const newComment = await CommentModel.create({
      username,
      body: reqBody,
      email,
      score,
      product,
    });

    //validation
    if (!username.trim() || !reqBody.trim() || !email.trim() || !score) {
      return Response.json({ message: "Invalid data" }, { status: 422 });
    }

    if (!validateEmail(email)) {
      return Response.json({ message: "Invalid Email" }, { status: 422 });
    }

    if (!product) {
      return Response.json({ message: "Invalid Product" }, { status: 422 });
    }

    await ProductModel.findOneAndUpdate(
      { _id: product },
      {
        $push: {
          comments: newComment._id,
        },
      }
    );
    return Response.json(
      { message: "New comment created successfully", data: newComment },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDB();
    const comments = await CommentModel.find({}, "-__v");
    return Response.json(comments);
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
