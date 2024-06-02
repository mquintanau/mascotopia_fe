import { useState, useEffect, useCallback } from "react";
import PostFilter from "./PostFilter";

const PostFilterContainer = ({ filter, setFilter }) => {
  return (
    <div className="flex flex-row items-center justify-center">
      <div className="flex w-full flex-row flex-wrap justify-center">
        <PostFilter
          name="All"
          setFilter={setFilter}
          active={filter === "All"}
        />
        <PostFilter
          name="Local"
          setFilter={setFilter}
          active={filter === "Local"}
        />
        <PostFilter
          name="Featured"
          setFilter={setFilter}
          active={filter === "Featured"}
        />
        <PostFilter
          name="Recent"
          setFilter={setFilter}
          active={filter === "Recent"}
        />
        <PostFilter
          name="Popular"
          setFilter={setFilter}
          active={filter === "Popular"}
        />
      </div>
    </div>
  );
};

export default PostFilterContainer;
