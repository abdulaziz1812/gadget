import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }), 
  
  tagTypes: ['Posts'],
  
  
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "blogs",
      providesTags: ['Posts'],
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
    deletePost: builder.mutation({
      query: (id) => ({
        url: `blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Posts']
    }),
    updatePost: builder.mutation({
      query: ({ id, updatedPost }) => ({
        url: `posts/${id}`,
        method: 'PUT',
        body: updatedPost,
      }),
      invalidatesTags: ['Posts'],
    }),
    addComment: builder.mutation({
      query: ({ id, comment }) => ({
        url: `blogs/${id}/comments`,
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["Posts"], // or refetchBlogById if needed
    }),



  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useRegisterUserMutation,
  // useLoginUserMutation,
  useCreatePostMutation,
  useDeletePostMutation,
useUpdatePostMutation,
useAddCommentMutation,


} = api;
