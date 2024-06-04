import { useState, useEffect, useCallback } from "react";
import PostFilterContainer from "./PostFilterContainer";
import PostItem from "./PostItem";
import { API_URL } from "../../auth/constants";

const PostContainer = ({ posts, loadPosts }) => {
  console.log(`${API_URL}/sendLike`);
  const [orderedPosts, setOrderedPosts] = useState(posts);
  const [filter, setFilter] = useState("Recent");

  const setLikedPost = (postId, idUser) => {
    // hace una peticion a la ruta de sendLike para dar like a un post
    fetch(`${API_URL}/sendLike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, idUser }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
        const dateA = new Date(a.fecha);
        const dateB = new Date(b.fecha);
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
    <div className="min-[600px] mx-auto my-6 max-w-[600px] rounded-lg p-4 shadow-lg max-[600px]:bg-background max-[600px]:shadow-none min-[600px]:bg-secondary md:p-10">
      <h2 className="text-lg font-bold">Featured &amp; Local News &gt;</h2>
      <hr className="my-4 border-t-2 border-[#185450]" />
      <PostFilterContainer filter={filter} setFilter={setFilter} />
      {orderedPosts.map((post) => {
        const idUser = localStorage.getItem("idUser");
        const isLiked = post.likes.includes(idUser);
        return (
          <PostItem
            value={post}
            key={post._id}
            isLiked={isLiked}
            loadPosts={loadPosts}
            setLikedPost={() => setLikedPost(post._id, idUser)}
          />
        );
      })}
    </div>
  );
};

export default PostContainer;
