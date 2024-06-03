import { useState } from "react";
import PostComment from "./PostComment";

const PostCommentContainer = ({ comments }) => {
  const [showAllComments, setShowAllComments] = useState(false);
  const commentsToShow = showAllComments ? comments : comments.slice(0, 2);

  const toggleShowComments = () => {
    setShowAllComments((prev) => !prev);
  };

  return (
    <div className="my-2">
      <div
        className={`ml-1 flex w-full flex-col overflow-y-scroll ${comments.length > 2 ? "max-h-[200px]" : ""}`}
      >
        {commentsToShow.map((comment, index) => (
          <PostComment key={index} {...comment} />
        ))}
      </div>
      {comments.length > 2 && (
        <p
          onClick={toggleShowComments}
          className={`ml-1 font-light hover:cursor-pointer`}
        >
          {showAllComments ? "Hide Comments" : "Show All Comments"}
        </p>
      )}
    </div>
  );
};

export default PostCommentContainer;
