"use client";

import { useGetBlogsQuery } from "@/src/redux/api/api";
import BlogCard from "./BlogCards";
import { ClipLoader } from "react-spinners";

const BlogSection = () => {
  const { data: posts = [], isLoading, isError } = useGetBlogsQuery();

  return (
    <section className="py-10 lg:w-8/12 md:w-10/12  mx-auto ">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-2 text-center">
          Latest Blogs
        </h2>
        <p className="text-gray-600 mb-8 text-center w-10/12 mx-auto">
          Stay updated with the latest tech trends and gadget reviews.
        </p>

        {isLoading && 
        <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50}  />
      </div>
        }
        {isError && <p>Failed to load blogs.</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
