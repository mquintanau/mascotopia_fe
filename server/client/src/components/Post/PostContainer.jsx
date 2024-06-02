import { useState, useEffect, useCallback } from "react";
import PostFilterContainer from "./PostFilterContainer";
import PostItem from "./PostItem";
import Swal from "sweetalert2";
import { API_URL } from "../../auth/constants";

const PostContainer = () => {
  const [likedPosts, setLikedPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [orderedPosts, setOrderedPosts] = useState(posts);
  const [filter, setFilter] = useState("All");

  const loadPosts = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/post/getPosts/`);
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: { error },
      });
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  useEffect(() => {
    if (filter === "All") {
      setOrderedPosts(posts);
    } else if (filter === "Local") {
      // Ordena primero los posts con tipo igual a "featured"
      const localPosts = [...posts].sort((a, b) => {
        if (a.tipo === "local") {
          return -1;
        } else if (b.tipo === "local") {
          return 1;
        } else {
          return 0;
        }
      });
      setOrderedPosts(localPosts);
    } else if (filter === "Featured") {
      // Ordena primero los posts con tipo igual a "featured"
      const featuredPosts = [...posts].sort((a, b) => {
        if (a.tipo === "featured") {
          return -1;
        } else if (b.tipo === "featured") {
          return 1;
        } else {
          return 0;
        }
      });
      setOrderedPosts(featuredPosts);
    } else if (filter === "Recent") {
      // make a copy of posts
      let recentPosts = [...posts];

      recentPosts = recentPosts.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });

      setOrderedPosts(recentPosts);
    } else if (filter === "Popular") {
      const popularPosts = [...posts].sort((a, b) => b.numLikes - a.numLikes);
      setOrderedPosts(popularPosts);
    }
  }, [posts, filter]);

  if (posts.length === 0) {
    return (
      <div className="mx-auto my-6 max-w-[600px] rounded-lg bg-secondary p-10 shadow-lg">
        <h2 className="text-lg font-bold">Featured &amp; Local News &gt;</h2>
        <hr className="my-4 border-t-2 border-[#185450]" />
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto my-6 max-w-[600px] rounded-lg bg-secondary p-10 shadow-lg">
      <h2 className="text-lg font-bold">Featured &amp; Local News &gt;</h2>
      <hr className="my-4 border-t-2 border-[#185450]" />
      <PostFilterContainer filter={filter} setFilter={setFilter} />
      {orderedPosts.map((post, index) => {
        const isLiked = likedPosts.includes(post._id);
        return (
          <PostItem
            value={post}
            key={post._id}
            isLiked={isLiked}
            loadPosts={loadPosts}
          />
        );
      })}
    </div>
  );
};

export default PostContainer;
