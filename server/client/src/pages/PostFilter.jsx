const PostFilter = ({ name, setFilter, posts, setOrderedPosts }) => {
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
      return "📢" + name;
    } else if (name === "Featured") {
      return "💫" + name;
    } else if (name === "Recent") {
      return "🕒" + name;
    } else if (name === "Popular") {
      return "❤️" + name;
    }
  };

  return (
    <div
      onClick={() => {
        filterPosts(name);
        setFilter(name);
      }}
      className="m-2 w-[80px] bg-white text-center hover:cursor-pointer"
    >
      {outputName(name)}
    </div>
  );
};

export default PostFilter;
