import React, { useState } from "react";
import { Post } from "@/types";
import { AiFillLike, AiFillDislike } from "react-icons/ai";

type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => {
  const [likes, setLikes] = useState(post.reactions.likes);
  const [dislikes, setDislikes] = useState(post.reactions.dislikes);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeBounce, setLikeBounce] = useState(false);
  const [dislikeBounce, setDislikeBounce] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      if (disliked) {
        setDislikes(dislikes - 1);
        setDisliked(false);
      }
      setLiked(true);
    }
    setLikeBounce(true);
    setTimeout(() => setLikeBounce(false), 500);
  };

  const handleDislike = () => {
    if (disliked) {
      setDislikes(dislikes - 1);
      setDisliked(false);
    } else {
      setDislikes(dislikes + 1);
      if (liked) {
        setLikes(likes - 1);
        setLiked(false);
      }
      setDisliked(true);
    }
    setDislikeBounce(true);
    setTimeout(() => setDislikeBounce(false), 500);
  };

  return (
    <div className="text-primary-light dark:text-primary-dark relative p-4 border border-solid border-primary-dark dark:border-primary-light">
      <div className="absolute bottom-4 right-4 w-8 h-8 lg:w-16 lg:h-16">
        <svg
          className="fill-primary-dark dark:fill-primary-light opacity-40"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
        >
          <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
        </svg>
      </div>
      <div className="flex items-center gap-2 relative z-10 pb-4">
        <span className="lg:w-12 lg:h-[1px] lg:bg-primary-light lg:dark:bg-primary-dark lg:block hidden "></span>
        <h2 className="font-normal text-xl">{post.title}</h2>
      </div>
      <p className="font-light text-sm relative z-10">{post.body}</p>
      <div className="flex gap-4 pt-4">
        <div
          role="button"
          className="flex items-center gap-1 py-1 px-2 border border-solid border-primary-dark dark:border-primary-light w-fit rounded-full bg-primary-light dark:bg-primary-dark text-background-light dark:text-background-dark group hover:bg-primary-dark dark:hover:bg-primary-light transition-all duration-150 ease-in-out"
          onClick={handleLike}
        >
          <AiFillLike
            className={`fill-background-light dark:fill-background-dark transition-all duration-150 ease-in-out ${
              likeBounce ? "animate-bounce" : ""
            }`}
          />
          <span>{likes}</span>
        </div>

        <div
          role="button"
          className="flex items-center gap-1 py-1 px-2 border border-solid border-primary-dark dark:border-primary-light w-fit rounded-full bg-primary-light dark:bg-primary-dark text-background-light dark:text-background-dark group hover:bg-primary-dark dark:hover:bg-primary-light transition-all duration-150 ease-in-out"
          onClick={handleDislike}
        >
          <AiFillDislike
            className={`fill-background-light dark:fill-background-dark transition-all duration-150 ease-in-out ${
              dislikeBounce ? "animate-bounce" : ""
            }`}
          />
          <span>{dislikes}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
