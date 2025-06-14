import dbConnect from "@/src/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  const blogCollections = await dbConnect("blogs");
  const { insertedId } = await blogCollections.insertOne(data);

  return NextResponse.json({ message: "Post created", insertedId }, { status: 201 });
}
