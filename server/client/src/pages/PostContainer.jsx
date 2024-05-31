import PostItem from "./PostItem";

const PostContainer = ({ posts, likedPosts, setLikedPosts }) => {
  return (
    <div className="mx-auto my-6 max-w-[600px] rounded-lg bg-secondary p-10">
      Featured &amp; Local News &gt;
      <hr className="my-4 border-t-2 border-[#185450]" />
      {posts.map((post) => {
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
