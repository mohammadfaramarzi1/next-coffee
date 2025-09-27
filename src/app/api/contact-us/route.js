import connectToDB from "@/configs/db";
import ContactusModel from "@/models/Contact";
import { validateEmail } from "@/utils/auth";

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const { email, name, company, phone, message } = body;
    if (
      !email.trim() ||
      !name.trim() ||
      !company.trim() ||
      !phone.trim() ||
      !message.trim()
    ) {
      return Response.json({ message: "Invalid data!" }, { status: 422 });
    }
    if (!validateEmail(email)) {
      return Response.json({ message: "Invalid Email!" }, { status: 422 });
    }
    await ContactusModel.create({ email, name, company, phone, message });
    return Response.json(
      { message: "Contact us created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "Unknown internal server error" },
      { status: 500 }
    );
  }
}
