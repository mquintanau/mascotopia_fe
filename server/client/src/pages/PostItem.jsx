import { Heart, HeartSolid } from "iconoir-react";

const PostItem = ({ value, setLikedPosts, isLiked = false }) => {
  const { title, description, numLikes } = value;
  const imageUrl = value.imageUrl || "https://via.placeholder.com/150";

  const handlePostLike = () => {
    setLikedPosts((prevValue) => Array.from(new Set([...prevValue, value.id])));
  };

  const handlePostDislike = () => {
    setLikedPosts((prevValue) => prevValue.filter((id) => id !== value.id));
  };

  return (
    <div className="my-7 flex flex-row items-center justify-center overflow-hidden rounded-lg bg-white px-4 font-normal">
      <div className="flex w-2/5 select-none items-center justify-center pr-4">
        <img src={imageUrl} alt={title} className="my-6 rounded-lg" />
      </div>
      <div className="w-3/5 text-base">
        <h2 className="font-bold">{title}</h2>
        <p className="mt-2" title="descrip">
          {description}
        </p>
        <div className="relative mt-2 flex flex-row transition-all duration-300 ease-in-out">
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
      </div>
    </div>
  );
};

export default PostItem;
