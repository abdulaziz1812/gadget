"use client";

import { useState } from "react";
import { useGetBlogByIdQuery } from "@/src/redux/api/api";
import { useParams } from "next/navigation";

export default function BlogDetail() {
  const { id } = useParams();
  const { data: post, isLoading, isError, refetch } = useGetBlogByIdQuery(id);

  // Comment form state
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!name.trim() || !message.trim()) {
      setErrorMsg("Please fill in both name and message.");
      return;
    }

    setSubmitting(true);

    try {
      // Call your API to add a comment to this blog post
      // Adjust URL and method to your backend implementation
      const res = await fetch(`/api/blogs/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit comment");
      }

      // Reset form
      setName("");
      setMessage("");
      setSuccessMsg("Comment added successfully!");

      // Refresh comments by refetching blog data
      refetch();
    } catch (error) {
      setErrorMsg(error.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoading)
    return <div className="text-center py-10 text-gray-600">Loading...</div>;
  if (isError || !post)
    return (
      <div className="text-center text-red-500 py-10 font-semibold">
        Blog not found.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md">
      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
        {post.title}
      </h1>

      {/* Author + Date */}
      <div className="text-sm text-gray-500 mb-8">
        By <span className="font-semibold">{post.author}</span> •{" "}
        {new Date(post.date).toLocaleDateString()}
      </div>

      {/* Content */}
      <div className="prose max-w-none text-gray-800 whitespace-pre-line mb-10">
        {post.content}
      </div>

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="flex gap-3 flex-wrap mb-12">
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full cursor-default select-none"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Comments Section */}
      <section className="border-t pt-8">
        <h2 className="text-3xl font-semibold mb-6 text-gray-900">Comments</h2>

        {post.comments?.length > 0 ? (
          <ul className="space-y-6 mb-12">
            {post.comments.map((comment, idx) => (
              <li
                key={idx}
                className="bg-gray-50 p-5 rounded-md border border-gray-200"
              >
                <p className="font-semibold text-gray-900">{comment.name}</p>
                <p className="mt-1 text-gray-700">{comment.message}</p>
                <p className="mt-2 text-xs text-gray-400 italic">
                  {new Date(comment.date).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 mb-12">No comments yet. Be the first!</p>
        )}

        {/* Add Comment Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-gray-50 p-6 rounded-md border border-gray-200"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-900">
            Add a Comment
          </h3>

          {errorMsg && (
            <p className="mb-4 text-red-600 font-medium">{errorMsg}</p>
          )}
          {successMsg && (
            <p className="mb-4 text-green-600 font-medium">{successMsg}</p>
          )}

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={submitting}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your name"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-2"
            >
              Comment
            </label>
            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={submitting}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write your comment here"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 rounded-md text-white font-semibold transition ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {submitting ? "Submitting..." : "Submit Comment"}
          </button>
        </form>
      </section>
    </div>
  );
}
