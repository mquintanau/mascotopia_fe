import { twMerge } from "tailwind-merge";

const PostFilter = ({ name, filter, setFilter, posts, setOrderedPosts }) => {
  const filterPosts = (filter) => {
    if (filter === "All") {
      setOrderedPosts(posts);
    } else if (filter === "Local") {
      // const localPosts = orderedPosts.filter(
      //   (post) => post.author === "hamsterfanatic",
      // );
      // setOrderedPosts(localPosts);
    } else if (filter === "Featured") {
      const featuredPosts = [...posts].filter((post) => post.numLikes > 10);
      setOrderedPosts(featuredPosts);
    } else if (filter === "Recent") {
      const recentPosts = [...posts].sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );
      setOrderedPosts(recentPosts);
    } else if (filter === "Popular") {
      const popularPosts = [...posts].sort((a, b) => b.numLikes - a.numLikes);
      setOrderedPosts(popularPosts);
      console.log(popularPosts);
    }
  };

  const outputName = (name) => {
    if (name === "All") {
      return "" + name;
    } else if (name === "Local") {
      return "📍 " + name;
    } else if (name === "Featured") {
      return "🌟 " + name;
    } else if (name === "Recent") {
      return "🕒 " + name;
    } else if (name === "Popular") {
      return "❤️ " + name;
    }
  };

  const filterClass = twMerge(
    "mx-1 my-1 flex h-[30px] w-[110px] items-center justify-center rounded-3xl bg-white text-center hover:cursor-pointer shadow-lg",
    filter === name
      ? "font-bold bg-neutral-100 outline outline-2"
      : "hover:font-bold",
  );

  return (
    <div
      onClick={() => {
        filterPosts(name);
        setFilter(name);
      }}
      className={filterClass}
    >
      <p className="">{outputName(name)}</p>
    </div>
  );
};

export default PostFilter;
