import { useState } from "react";
import moment from "moment";
import PostContainer from "./PostContainer";

const posts = [
  {
    id: 1,
    title: "My cat learned a new trick",
    description:
      "I'm very excited to share that my cat now knows how to shake hands.",
    date: "2024-05-01T12:00:00Z",
    author: "user123",
    numComments: 2,
    numLikes: 15,
    imageUrl:
      "https://images.picxy.com/cache/2019/12/26/ba8757c4a2190faf358d83c09f66ca80.jpg",
    comments: [
      {
        reply: "That's awesome! How did you manage that?",
        date: "2024-05-01T14:30:00Z",
        author: "catfriend",
      },
      {
        reply: "I'm going to try teaching my cat that too.",
        date: "2024-05-01T15:00:00Z",
        author: "catlover45",
      },
    ],
  },
  {
    id: 2,
    title: "Tips for caring for a senior dog",
    description:
      "My dog is already 12 years old and I want to make sure to give him the best quality of life possible.",
    date: "2024-04-25T10:00:00Z",
    author: "dogfanatic",
    numComments: 3,
    numLikes: 20,
    imageUrl: "https://d2zp5xs5cp8zlg.cloudfront.net/image-55813-800.jpg",
    comments: [
      {
        reply: "Give him special food for senior dogs, it helps a lot.",
        date: "2024-04-25T11:15:00Z",
        author: "veterinarian_pro",
      },
      {
        reply: "Don't forget frequent veterinary check-ups.",
        date: "2024-04-25T12:00:00Z",
        author: "petcarelover",
      },
      {
        reply: "Lots of patience and love, they need it more than ever.",
        date: "2024-04-25T13:30:00Z",
        author: "doglover_99",
      },
    ],
  },
  {
    id: 3,
    title: "My rabbit eats too many carrots",
    description:
      "Is it bad that my rabbit eats a lot of carrots? He eats about 3 a day.",
    date: "2024-05-15T08:00:00Z",
    author: "bunnylover",
    numComments: 2,
    numLikes: 8,
    comments: [
      {
        reply:
          "Too many carrots can be bad for his health. Try giving him a more balanced diet.",
        date: "2024-05-15T09:00:00Z",
        author: "vetexpert",
      },
      {
        reply: "You can give him other vegetables like lettuce and spinach.",
        date: "2024-05-15T09:30:00Z",
        author: "rabbitfan",
      },
    ],
  },
  {
    id: 4,
    title: "Pictures of my new hamster",
    description: "Here are some pictures of my new hamster, he's so cute!",
    date: "2024-05-20T16:00:00Z",
    author: "hamsterfanatic",
    numComments: 1,
    numLikes: 12,
    comments: [
      {
        reply: "So cute! What's his name?",
        date: "2024-05-20T17:00:00Z",
        author: "lovelypets",
      },
    ],
  },
  {
    id: 5,
    title: "My betta fish is losing color",
    description:
      "My betta fish used to have very vibrant colors, but lately, he looks pale. What can I do?",
    date: "2024-04-30T07:00:00Z",
    author: "fishkeeper",
    numComments: 2,
    numLikes: 5,
    comments: [
      {
        reply:
          "Check the water quality, sometimes it's due to stress or poor diet.",
        date: "2024-04-30T08:00:00Z",
        author: "aquarist",
      },
      {
        reply: "You can try changing his diet and adding supplements.",
        date: "2024-04-30T09:00:00Z",
        author: "fish_expert",
      },
    ],
  },
];

const Feed = () => {
  const [likedPosts, setLikedPosts] = useState([]);
  console.log(likedPosts);
  return (
    <div className="min-h-screen w-screen">
      <h2 className="mx-auto w-full pt-10 text-center text-2xl font-semibold">
        Pet News
        <span className="ml-2 text-lg font-normal">
          {moment().format("dddd, MMMM Do YYYY")}
        </span>
      </h2>
      <PostContainer
        posts={posts}
        likedPosts={likedPosts}
        setLikedPosts={setLikedPosts}
      />
    </div>
  );
};

export default Feed;
