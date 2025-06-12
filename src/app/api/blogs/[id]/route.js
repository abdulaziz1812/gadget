import dbConnect from '@/src/lib/dbConnect';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server'


export async function GET(req, {params}) {
  const blogCollection = dbConnect('blogs');

  const blogs = await blogCollection.findOne({_id: new ObjectId(params.id)})


  if (!blogs) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(blogs);
}
