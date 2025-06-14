'use client';

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCreatePostMutation } from "@/src/redux/api/api";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

export default function CreatePostPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const [createPost] = useCreatePostMutation();

  if (status === "loading") return (
    <div className="flex justify-center items-center py-10 min-h-screen">
      <ClipLoader size={50} />
    </div>
  );
  if (!session) return null;

  const author = session.user.name || "Unknown";
  const email = session.user.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const snippet = form.snippet.value;
    const content = form.content.value;
    const tags = form.tags.value
      ? form.tags.value.split(",").map((tag) => tag.trim())
      : [];

    try {
      await createPost({
        title,
        snippet,
        content,
        tags,
        author,
        email,
        date: new Date().toISOString(),
      }).unwrap();

      toast.success("Post created successfully!");
      router.push("/my_posts");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create post.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="snippet"
          placeholder="Snippet"
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="content"
          placeholder="Content"
          required
          className="w-full p-2 border rounded h-40"
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
