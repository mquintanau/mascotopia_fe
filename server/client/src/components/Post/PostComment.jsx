const PostComment = ({ author, reply }) => {
  return (
    <div className="my-1 flex flex-row">
      <p>
        <span className="mr-2 font-semibold">{author}</span>
        {reply}
      </p>
    </div>
  );
};

export default PostComment;
