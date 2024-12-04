import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: [],

  reducers: {
    getAllPosts: (state, action) => {
      return action.payload 
    },
    createPost: (state, action) => {
      state.push(action.payload);
    },
    deletePostById: (state, action) => {
      return state.filter((post) => post.id !== action.payload.id);
    },
    editPost:(state,action)=>
    {
        const{id,updatedPost} = action.payload;
        const postIndex = state.findIndex((post) => post.id === id);
        if (postIndex !== -1) 
        {
            state[postIndex] = {...state[postIndex],...updatedPost}
        }
    },

    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      const postIndex = state.findIndex((post) => post.id === postId);
      if (postIndex !== -1) {
        state[postIndex].comments.push(comment);
      }
  },
});

export const { getAllPosts, createPost, deletePostById,editPost,addComment } = postSlice.actions;

export default postSlice.reducer;
