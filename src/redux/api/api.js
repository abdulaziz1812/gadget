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
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "register",
        method: "POST",
        body: userData,
      }),
    }),
    // loginUser: builder.mutation({
    //   query: (credentials) => ({
    //     url: "login", 
    //     method: "POST",
    //     body: credentials,
    //   }),
    // }),
    createPost: builder.mutation({
      query: (postData) => ({
        url: "posts",
        method: "POST",
        body: postData,
      }),
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useRegisterUserMutation,
  // useLoginUserMutation,
  useCreatePostMutation,
} = api;
