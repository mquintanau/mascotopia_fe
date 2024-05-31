import PostItem from "./PostItem";

const PostContainer = ({ posts }) => {
  console.log(posts.map((post) => post.id));
  return (
    <div className="mx-auto max-w-[600px] bg-secondary px-10">
      Featured &amp; Local News &gt;
      {posts.map((post) => (
        <PostItem value={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostContainer;
