import dbConnect from '@/src/lib/dbConnect';
import { NextResponse } from 'next/server'


export async function GET() {
  const blogCollection = dbConnect('blogs');

  const blogs = await blogCollection.find().sort({ date: -1 }).toArray();

  return NextResponse.json(blogs);
}
