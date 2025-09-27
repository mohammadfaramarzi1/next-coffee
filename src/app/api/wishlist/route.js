import connectToDB from "@/configs/db";
import WishlistModel from "@/models/Wishlist";
import UserModel from "@/models/User";
import ProductModel from "@/models/Product";

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const { user, product } = body;
    const mainUser = await UserModel.findOne({ _id: user });
    const mainProduct = await ProductModel.findOne({ _id: product });
    if (!mainProduct) {
      return Response.json(
        { message: "This product does not exists" },
        { status: 422 }
      );
    }
    if (!mainUser) {
      return Response.json(
        { message: "This user does not exists" },
        { status: 422 }
      );
    }
    await WishlistModel.create({ user, product });
    return Response.json(
      { message: "Product added to wishlist successfully" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: `Internal server error => ${error}` },
      { status: 500 }
    );
  }
}
