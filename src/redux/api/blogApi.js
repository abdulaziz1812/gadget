import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }), // remove /blogs here
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "blogs",
    }),
    getBlogById: builder.query({
      query: (id) => `blogs/${id}`,
    }),
  }),
});

export const { useGetBlogsQuery,useGetBlogByIdQuery } = api;
