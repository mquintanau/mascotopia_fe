import { Heart, HeartSolid, ChatBubble, Send } from "iconoir-react";
import PostComment from "./PostComment";
import Input from "../Input/Input";
import useUserLoader from "../../utils/useUserLoader";
import DataContext from "../../auth/DataContext";
import { API_URL } from "../../auth/constants";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import PostCommentContainer from "./PostCommentContainer";

const PostItem = ({ value, setLikedPosts, isLiked = false, loadPosts }) => {
  const {
    titulo,
    descripcion,
    fecha,
    numLikes,
    autor,
    autorImageURL,
    comentarios,
  } = value;
  const imageURL = value.imageURL;

  const { data, setData } = useContext(DataContext);
  const [comment, setComment] = useState("");
  const idUsuario = localStorage.getItem("idUser");
  const loadUser = useUserLoader(API_URL, idUsuario, setData);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handlePostLike = () => {
    setLikedPosts((prevValue) =>
      Array.from(new Set([...prevValue, value._id])),
    );
  };

  const handlePostDislike = () => {
    setLikedPosts((prevValue) => prevValue.filter((id) => id !== value._id));
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    // Crear FormData
    const respuesta = comment;
    const idPost = value._id;
    try {
      const response = await axios.post(
        `${API_URL}/sendReplyPost/${idPost}/${idUsuario}`,
        {
          respuesta,
        },
      );
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Reply Sent!",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
        setComment(""); // Limpia el campo de texto
        loadPosts(); // Recarga las preguntas
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: { error },
      });
    }
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
      <img
        src={
          !imageURL
            ? "https://via.placeholder.com/150"
            : imageURL.startsWith("/uploads")
              ? `http://localhost:4000${imageURL}`
              : imageURL
        }
        alt={titulo}
        className="my-6 rounded-lg"
      />
      <div className="flex w-full flex-col text-base">
        {/* Like & comment section */}
        <div className="flex w-full flex-row">
          <div
            title={isLiked ? "Dislike" : "Like"}
            className="relative flex flex-row hover:cursor-pointer"
          >
            <Heart
              onClick={handlePostLike}
              className={`absolute transform transition-transform duration-300 ease-in-out hover:scale-125 ${isLiked ? "-z-40 scale-0 opacity-0" : "z-40 scale-100 opacity-100"}`}
            />
            <HeartSolid
              onClick={handlePostDislike}
              className={`absolute transform transition-transform duration-300 ease-in-out hover:scale-125 ${isLiked ? "z-40 scale-100 opacity-100" : "-z-40 scale-0 opacity-0"}`}
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
        <PostCommentContainer comments={comentarios} />
        <div className="flex flex-row items-center overflow-hidden rounded-lg bg-neutral-200">
          <form
            className="flex w-full items-center"
            onSubmit={handleSubmitComment}
          >
            <input
              type="text"
              placeholder="Add a comment"
              className="w-full bg-neutral-200 px-4 py-2 focus:outline-none"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            <button type="submit" className="ml-auto mr-5">
              <Send className="text-neutral-600 hover:cursor-pointer" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
