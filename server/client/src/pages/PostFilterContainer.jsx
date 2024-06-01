import { useState } from "react";
import PostFilter from "./PostFilter";

const PostFilterContainer = ({ posts, setOrderedPosts }) => {
  const [filter, setFilter] = useState("All");

  return (
    <div className="flex flex-row items-center justify-center">
      <h2 className="w-[100px] text-lg font-bold">Filter by:</h2>
      <div className="ml-4 flex flex-row flex-wrap justify-between">
        <PostFilter
          name="All"
          setFilter={setFilter}
          posts={posts}
          setOrderedPosts={setOrderedPosts}
        />
        <PostFilter
          name="Local"
          setFilter={setFilter}
          posts={posts}
          setOrderedPosts={setOrderedPosts}
        />
        <PostFilter
          name="Featured"
          setFilter={setFilter}
          posts={posts}
          setOrderedPosts={setOrderedPosts}
        />
        <PostFilter
          name="Recent"
          setFilter={setFilter}
          posts={posts}
          setOrderedPosts={setOrderedPosts}
        />
        <PostFilter
          name="Popular"
          setFilter={setFilter}
          posts={posts}
          setOrderedPosts={setOrderedPosts}
        />
      </div>
    </div>
  );
};

export default PostFilterContainer;
