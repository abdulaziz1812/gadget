'use client';

import { useRouter, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useGetBlogsQuery, useUpdatePostMutation } from '@/src/redux/api/api';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

export default function EditPostPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data: posts, isLoading } = useGetBlogsQuery();
  const [updatePost] = useUpdatePostMutation();

  const [post, setPost] = useState(null);

  
  useEffect(() => {
    if (posts) {
      const current = posts.find((p) => p._id === id);
      setPost(current);
    }
  }, [posts, id]);

  if (isLoading || !post) return (
    <div className="flex justify-center items-center py-10 min-h-screen">
      <ClipLoader size={50} />
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const snippet = form.snippet.value;
    const content = form.content.value;
    const tags = form.tags.value.split(',').map((tag) => tag.trim());

    const updatedPost = { title, snippet, content, tags };

    try {
      await updatePost({ id, updatedPost }).unwrap();
      toast.success('Post updated successfully!');
      router.push('/my_posts');
    } catch (err) {
      toast.error('Update failed');
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Edit Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          defaultValue={post.title}
          className="input input-bordered border-2 w-full"
          placeholder="Title"
          required
        />
        <input
          name="snippet"
          defaultValue={post.snippet}
          className="input input-bordered border-2 w-full"
          placeholder="Snippet"
          required
        />
        <textarea
          name="content"
          defaultValue={post.content}
          className="textarea textarea-bordered border-2 w-full"
          placeholder="Content"
          rows={5}
          required
        />
        <input
          name="tags"
          defaultValue={post.tags?.join(', ')}
          className="input input-bordered w-full border-2"
          placeholder="Tags (comma separated)"
        />
        <button type="submit" className="btn btn-primary">
          Update Post
        </button>
      </form>
    </div>
  );
}
