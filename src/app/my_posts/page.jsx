"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useGetBlogsQuery, useDeletePostMutation } from "@/src/redux/api/api";
import Link from "next/link";
import toast from "react-hot-toast";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ClipLoader } from "react-spinners";

const MySwal = withReactContent(Swal);

export default function MyPostPage() {
  const { data: session, status } = useSession();
  const router = useRouter();


  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const { data: posts, isLoading, isError, refetch } = useGetBlogsQuery();
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

  if (status === "loading")
    return (
      <div className="flex justify-center items-center py-10 min-h-screen">
        <ClipLoader size={50} />
      </div>
    );
  if (!session) return null;

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-10 min-h-screen">
        <ClipLoader size={50} />
      </div>
    );
  if (isError) return <p>Error loading posts.</p>;

  const userPosts = posts.filter((post) => post.email === session.user.email);

  const handleDelete = async (id) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deletePost(id).unwrap();
        toast.success("Post deleted successfully!");
        refetch();
      } catch (error) {
        toast.error("Failed to delete post.");
        console.error(error);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Posts</h1>

      {userPosts.length === 0 ? (
        <p>You have no posts yet.</p>
      ) : (
        <ul className="space-y-4">
          {userPosts.map((post) => (
            <li key={post._id} className="border p-4 rounded shadow">
              <h2 className="font-bold text-xl">{post.title}</h2>
              <p className="italic mb-2">{post.snippet}</p>
              <p>{post.content}</p>
              <p className="mt-2 text-sm text-gray-500">
                Tags: {post.tags.join(", ")}
              </p>
              <p className="mt-2 text-xs text-gray-400">
                Author: {post.author}
              </p>
              <p className="text-xs text-gray-400">
                Date: {new Date(post.date).toLocaleString()}
              </p>

              <div className="mt-4 flex gap-2">
                <Link
                  href={`/edit/${post._id}`}
                  className="btn btn-sm btn-primary"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  disabled={isDeleting}
                  className="btn btn-sm btn-error"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
