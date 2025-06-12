"use client";

import Link from "next/link";
import { format } from "date-fns";

const BlogCard = ({ post }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 space-y-4 border border-gray-100">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-gray-800">{post.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-3">
          {post.content?.slice(0, 120) + "..."}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {post.tags?.map((tag, idx) => (
          <span
            key={idx}
            className="badge badge-outline badge-info text-xs px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>By {post.author || "Anonymous"}</span>
        <span>{format(new Date(post.date), "dd MMM yyyy")}</span>
      </div>

      <Link
        href={`/blog/${post._id}`}
        className="inline-block text-blue-600 font-semibold hover:underline text-sm"
      >
        Read More →
      </Link>
    </div>
  );
};

export default BlogCard;
