import { twMerge } from "tailwind-merge";

const PostFilter = ({ name = "", setFilter, active = false }) => {
  let outputName = "";

  if (name === "Local") {
    outputName = "📢 " + name;
  } else if (name === "Featured") {
    outputName = "🌟 " + name;
  } else if (name === "Recent") {
    outputName = "🕒 " + name;
  } else if (name === "Popular") {
    outputName = "❤️ " + name;
  }

  const filterClass = twMerge(
    "mx-1 my-1 flex h-[30px] w-[110px] items-center justify-center rounded-3xl bg-white text-center hover:cursor-pointer shadow-lg",
    active ? "font-bold bg-neutral-100 outline outline-2" : "hover:font-bold",
  );

  return (
    <div
      onClick={() => {
        setFilter(name);
      }}
      className={filterClass}
    >
      <p className="">{outputName}</p>
    </div>
  );
};

export default PostFilter;
