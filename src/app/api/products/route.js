import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const {
      name,
      price,
      shortDescription,
      longDescription,
      weight,
      suitableFor,
      smell,
      score,
      tags,
    } = body;

    const newProduct = await ProductModel.create({
      name,
      price,
      shortDescription,
      longDescription,
      weight,
      suitableFor,
      smell,
      tags,
      score,
    });

    return Response.json(
      { message: "New product created successfully", data: newProduct },
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
    const products = await ProductModel.find({}, "-__v").populate("comments");
    return Response.json(products);
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
