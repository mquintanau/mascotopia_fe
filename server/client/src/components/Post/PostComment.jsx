const PostComment = ({ autor, respuesta }) => {
  return (
    <div className="my-1 flex flex-row">
      <p>
        <span className="mr-2 font-semibold">{autor}</span>
        {respuesta}
      </p>
    </div>
  );
};

export default PostComment;
