/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext } from "react";

const PostContext = createContext(null);

export function PostProvider({ children, value }) {
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

export function usePost() {
  const ctx = useContext(PostContext);
  if (ctx === null) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return ctx;
}

export default PostContext;
