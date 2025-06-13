'use client'

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCreatePostMutation } from "@/src/redux/api/api";

export default function CreatePostPage() {
  const { data: session } = useSession();
  const author = session?.user?.name || session?.user?.email || "Unknown";

  const [createPost] = useCreatePostMutation();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const snippet = form.snippet.value;
    const content = form.content.value;
    const tags = form.tags.value.split(",").map(tag => tag.trim());

    const postData = {
      title,
      snippet,
      content,
      tags,
      author,
      date: new Date().toISOString(),
    };

    try {
      await createPost(postData).unwrap();
      toast.success("Post created successfully!");
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create post");
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
