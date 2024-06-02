import { Heart, HeartSolid, ChatBubble, Send } from "iconoir-react";
import PostComment from "./PostComment";
import Input from "../Input/Input";

const PostItem = ({ value, setLikedPosts, isLiked = false }) => {
  const {
    titulo,
    descripcion,
    fecha,
    numLikes,
    autor,
    autorImageURL,
    comentarios,
  } = value;
  const imageURL = value.imageURL || "https://via.placeholder.com/150";

  const handlePostLike = () => {
    setLikedPosts((prevValue) =>
      Array.from(new Set([...prevValue, value._id])),
    );
  };

  const handlePostDislike = () => {
    setLikedPosts((prevValue) => prevValue.filter((id) => id !== value._id));
  };

  return (
    <div className="my-7 flex flex-col justify-center overflow-hidden rounded-lg bg-white px-4 py-4 font-normal shadow-lg">
      <div className="flex flex-row items-center justify-start">
        {/* Author section */}
        <h2 className="text-lg font-bold">{titulo}</h2>
        <div className="ml-auto flex">
          <img
            src={
              !autorImageURL
                ? "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-icon.png"
                : autorImageURL.startsWith("/uploads")
                  ? `http://localhost:4000${autorImageURL}`
                  : autorImageURL
            }
            alt={autor}
            className="h-[50px] w-[50px] rounded-full object-cover shadow-md"
          />
          <div className="ml-3">
            <p className="font-semibold">{autor}</p>
            <p className="">
              {new Date(fecha).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
      <hr className="border-t-1 my-4 border-neutral-200" />
      <div>
        {/* Description Section */}
        <p className="mt-2" title="descrip">
          {descripcion}
        </p>
      </div>
      <img src={imageURL} alt={titulo} className="my-6 rounded-lg" />
      <div className="flex w-full flex-col text-base">
        {/* Like & comment section */}
        <div className="flex w-full flex-row">
          <div
            title={isLiked ? "Dislike" : "Like"}
            className="relative flex flex-row hover:cursor-pointer"
          >
            <Heart
              onClick={handlePostLike}
              className={`absolute transform transition-transform duration-300 ease-in-out hover:scale-125 ${isLiked ? "-z-50 scale-0 opacity-0" : "z-50 scale-100 opacity-100"}`}
            />
            <HeartSolid
              onClick={handlePostDislike}
              className={`absolute transform transition-transform duration-300 ease-in-out hover:scale-125 ${isLiked ? "z-50 scale-100 opacity-100" : "-z-50 scale-0 opacity-0"}`}
            />
          </div>
          <span className="ml-8 select-none">
            Likes: {isLiked ? numLikes + 1 : numLikes}
          </span>
          <div className="ml-8 flex select-none flex-row">
            <ChatBubble />
            <p className="ml-2">Comments: {comentarios.length}</p>
          </div>
        </div>
        <div className="my-2 ml-1 flex w-full flex-col">
          {value.comentarios.map((comment, index) => (
            <PostComment key={index} {...comment} />
          ))}
        </div>
        <div className="flex flex-row items-center overflow-hidden rounded-lg bg-neutral-200">
          <input
            type="text"
            placeholder="Add a comment"
            className="w-full bg-neutral-200 px-4 py-2 focus:outline-none"
          />
          <Send className="ml-auto mr-2 text-neutral-600 hover:cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default PostItem;
