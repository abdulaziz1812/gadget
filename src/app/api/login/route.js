
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// import dbConnect from "@/src/lib/dbConnect";


export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  const usersCollection = dbConnect("users");
//   const user = await usersCollection.findOne({ email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  return NextResponse.json({ message: "Login successful", user });
}
