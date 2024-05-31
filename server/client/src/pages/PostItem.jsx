import { Heart } from "iconoir-react";

const PostItem = ({ value }) => {
  const { title, description, numLikes } = value;
  const imageUrl = value.imageUrl || "https://via.placeholder.com/150";

  return (
    <div className="my-7 flex flex-row flex-nowrap items-center justify-center overflow-hidden rounded-lg bg-white font-normal">
      <div className="flex w-2/5 items-center justify-center">
        <img src={imageUrl} alt={title} className="py-6" />
      </div>
      <div className="w-3/5 text-base">
        <h2 className="font-bold">{title}</h2>
        <p className="mt-1">{description}</p>
        <p className="mt-1 flex flex-row">
          <Heart />
          <span className="ml-2">Likes: {numLikes}</span>
        </p>
      </div>
    </div>
  );
};

export default PostItem;
