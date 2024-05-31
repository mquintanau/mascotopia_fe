const PostItem = ({ value }) => {
  const { title, description, numLikes } = value;
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Likes: {numLikes}</p>
    </div>
  );
};

export default PostItem;
