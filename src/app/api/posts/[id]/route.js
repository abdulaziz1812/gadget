import dbConnect from "@/src/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const id = params.id;
  const body = await req.json();
  const blogCollection = await dbConnect("blogs");

  const result = await blogCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: body }
  );

  return NextResponse.json({ message: "Post updated", result });
}
