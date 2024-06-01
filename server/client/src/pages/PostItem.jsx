import { Heart, HeartSolid } from "iconoir-react";

const PostItem = ({ value, setLikedPosts, isLiked = false }) => {
  const { title, description, date, numLikes, author, authorImageUrl } = value;
  const imageUrl = value.imageUrl || "https://via.placeholder.com/150";

  const handlePostLike = () => {
    setLikedPosts((prevValue) => Array.from(new Set([...prevValue, value.id])));
  };

  const handlePostDislike = () => {
    setLikedPosts((prevValue) => prevValue.filter((id) => id !== value.id));
  };

  return (
    <div className="my-7 flex flex-col justify-center overflow-hidden rounded-lg bg-white px-4 py-4 font-normal shadow-lg">
      <div className="flex flex-row items-center justify-start">
        {/* Author section */}
        <h2 className="font-bold">{title}</h2>
        <div className="ml-auto flex">
          <img
            src={authorImageUrl}
            alt={author}
            className="h-[50px] w-[50px] rounded-full object-cover shadow-md"
          />
          <div className="ml-3">
            <p className="font-semibold">{author}</p>
            <p className="">
              {new Date(date).toLocaleDateString(undefined, {
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
          {description}
        </p>
      </div>
      <img src={imageUrl} alt={title} className="my-6 rounded-lg" />
      <div className="flex w-full flex-col text-base">
        <div
          title={isLiked ? "Dislike" : "Like"}
          className="relative mt-2 flex flex-row hover:cursor-pointer"
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
      </div>
    </div>
  );
};

export default PostItem;
