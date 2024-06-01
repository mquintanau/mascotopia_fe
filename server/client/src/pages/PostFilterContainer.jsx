import { useState } from "react";
import PostFilter from "./PostFilter";

const PostFilterContainer = ({ posts, setOrderedPosts }) => {
  const [filter, setFilter] = useState("All");

  return (
    <div className="flex flex-row items-center justify-center">
      <div className="flex w-full flex-row flex-wrap justify-center">
        <PostFilter
          name="All"
          filter={filter}
          setFilter={setFilter}
          posts={posts}
          setOrderedPosts={setOrderedPosts}
        />
        <PostFilter
          name="Local"
          filter={filter}
          setFilter={setFilter}
          posts={posts}
          setOrderedPosts={setOrderedPosts}
        />
        <PostFilter
          name="Featured"
          filter={filter}
          setFilter={setFilter}
          posts={posts}
          setOrderedPosts={setOrderedPosts}
        />
        <PostFilter
          name="Recent"
          filter={filter}
          setFilter={setFilter}
          posts={posts}
          setOrderedPosts={setOrderedPosts}
        />
        <PostFilter
          name="Popular"
          filter={filter}
          setFilter={setFilter}
          posts={posts}
          setOrderedPosts={setOrderedPosts}
        />
      </div>
    </div>
  );
};

export default PostFilterContainer;
