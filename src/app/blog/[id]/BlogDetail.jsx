"use client";

import { useGetBlogByIdQuery } from "@/src/redux/api/api";
import { useParams } from "next/navigation";

export default function BlogDetail() {
  const { id } = useParams();
  const { data: post, isLoading, isError } = useGetBlogByIdQuery(id);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError || !post)
    return (
      <div className="text-center text-red-500 py-10">Blog not found.</div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4 text-gray-800">{post.title}</h1>

      {/* Author + Date */}
      <div className="text-sm text-gray-500 mb-4">
        By <span className="font-semibold">{post.author}</span> •{" "}
        {new Date(post.date).toLocaleDateString()}
      </div>

      {/* Content */}
      <div className="prose max-w-none text-gray-800 whitespace-pre-line mb-6">
        {post.content}
      </div>

      {/* Tags */}
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

      {/* Comments */}
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
      </div>
    </div>
  );
}
