import dbConnect from '@/src/lib/dbConnect';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';


// Get blog by ID
export async function GET(req, { params }) {
  const blogCollection = await dbConnect('blogs');
  const blog = await blogCollection.findOne({ _id: new ObjectId(params.id) });

  if (!blog) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(blog);
}

// Delete post
export async function DELETE(req, { params }) {
  const collection = await dbConnect("blogs");

  const result = await collection.deleteOne({ _id: new ObjectId(params.id) });

  if (result.deletedCount === 1) {
    return new Response(JSON.stringify({ message: "Post deleted" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ message: "Post not found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
}

// Add comment
export async function PATCH(req, { params }) {
  const blogCollection = await dbConnect('blogs');
  const blogId = new ObjectId(params.id);
  const { message } = await req.json();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userName = session.user.name || session.user.email;

  const result = await blogCollection.updateOne(
    { _id: blogId },
    {
      $push: {
        comments: {
          name: userName,
          message,
          date: new Date(),
        },
      },
    }
  );

  if (result.modifiedCount === 1) {
    return NextResponse.json({ message: "Comment added successfully" }, { status: 200 });
  } else {
    return NextResponse.json({ error: "Blog not found or comment not added" }, { status: 404 });
  }
}
