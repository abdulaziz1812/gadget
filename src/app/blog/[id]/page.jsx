'use client';

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useGetBlogByIdQuery } from "@/src/redux/api/api";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

export default function BlogDetail() {
  const { id } = useParams();
  const { data: post, isLoading, isError, refetch } = useGetBlogByIdQuery(id);
  const { data: session } = useSession();

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) return (
    <div className="flex justify-center items-center py-10 min-h-screen">
      <ClipLoader size={50} />
    </div>
  );
  if (isError || !post)
    return <div className="text-center text-red-500 py-10">Blog not found.</div>;


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      toast.error("Please log in to comment.");
      return;
    }

    if (!message.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Comment added!");
        setMessage("");
        refetch(); 
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (err) {
      toast.error("Failed to submit comment.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
     
      <h1 className="text-4xl font-bold mb-4 text-gray-800">{post.title}</h1>

   
      <div className="text-sm text-gray-500 mb-4">
        By <span className="font-semibold">{post.author}</span> •{" "}
        {new Date(post.date).toLocaleDateString()}
      </div>

  
      <div className="prose max-w-none text-gray-800 whitespace-pre-line mb-6">
        {post.content}
      </div>


      {post.tags?.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-8">
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

 
      <div className="mt-8 border-t pt-4">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>

        {post.comments?.length > 0 ? (
          <ul className="space-y-4">
            {post.comments.map((comment, idx) => (
              <li key={idx} className="bg-gray-100 p-3 rounded">
                <p className="font-semibold text-gray-800">{comment.name}</p>
                <p className="text-gray-700">{comment.message}</p>
                <p className="text-xs text-gray-500">
                  {new Date(comment.date).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No comments yet.</p>
        )}


        {session ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <textarea
              name="message"
              className="w-full border p-2 rounded resize-none"
              rows={3}
              placeholder="Write a comment..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Add Comment"}
            </button>
          </form>
        ) : (
          <p className="text-gray-500 mt-4">
            Please{" "}
            <a href="/api/auth/signin" className="text-blue-600 underline">
              log in
            </a>{" "}
            to write a comment.
          </p>
        )}
      </div>
    </div>
  );
}
