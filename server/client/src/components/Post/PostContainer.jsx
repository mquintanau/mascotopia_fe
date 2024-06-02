import { useState } from "react";
import PostFilterContainer from "./PostFilterContainer";
import PostItem from "./PostItem";

const PostContainer = ({ posts, likedPosts, setLikedPosts }) => {
  if (posts.length === 0) {
    return (
      <div className="mx-auto my-6 max-w-[600px] rounded-lg bg-secondary p-10 shadow-lg">
        <h2 className="text-lg font-bold">Featured &amp; Local News &gt;</h2>
        <hr className="my-4 border-t-2 border-[#185450]" />
        <h1>Loading...</h1>
      </div>
    );
  }
  const [orderedPosts, setOrderedPosts] = useState(posts);
  return (
    <div className="mx-auto my-6 max-w-[600px] rounded-lg bg-secondary p-10 shadow-lg">
      <h2 className="text-lg font-bold">Featured &amp; Local News &gt;</h2>
      <hr className="my-4 border-t-2 border-[#185450]" />
      <PostFilterContainer posts={posts} setOrderedPosts={setOrderedPosts} />
      {orderedPosts.map((post) => {
        const isLiked = likedPosts.includes(post._id);
        return (
          <PostItem
            value={post}
            key={post._id}
            setLikedPosts={setLikedPosts}
            isLiked={isLiked}
          />
        );
      })}
    </div>
  );
};

export default PostContainer;
