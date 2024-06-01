import { useState } from "react";
import PostFilterContainer from "./PostFilterContainer";
import PostItem from "./PostItem";

const PostContainer = ({ posts, likedPosts, setLikedPosts }) => {
  const [orderedPosts, setOrderedPosts] = useState(posts);

  return (
    <div className="mx-auto my-6 max-w-[600px] rounded-lg bg-secondary p-10">
      <h2 className="text-lg font-bold">Featured &amp; Local News &gt;</h2>
      <hr className="my-4 border-t-2 border-[#185450]" />
      <PostFilterContainer posts={posts} setOrderedPosts={setOrderedPosts} />
      {orderedPosts.map((post) => {
        const isLiked = likedPosts.includes(post.id);
        return (
          <PostItem
            value={post}
            key={post.id}
            setLikedPosts={setLikedPosts}
            isLiked={isLiked}
          />
        );
      })}
    </div>
  );
};

export default PostContainer;
