import React, { useState, useCallback } from "react";
import { Post } from "@/types";
import { AiFillLike } from "@react-icons/all-files/ai/AiFillLike";
import { AiFillDislike } from "@react-icons/all-files/ai/AiFillDislike";

type PostCardProps = {
  post: Post;
};

type ReactionButtonProps = {
  type: "like" | "dislike";
  count: number;
  onClick: () => void;
  isActive: boolean;
  bounce: boolean;
  label: string;
};

const ReactionButton: React.FC<ReactionButtonProps> = ({ type, count, onClick, isActive, bounce, label }) => {
  const Icon = type === "like" ? AiFillLike : AiFillDislike;
  return (
    <button
      type="button"
      className={`flex items-center gap-1 py-1 px-2 border border-solid border-primary-dark dark:border-primary-light w-fit rounded-full text-background-light dark:text-background-dark group hover:bg-primary-dark dark:hover:bg-primary-light transition-all duration-150 ease-in-out ${isActive ? 'bg-primary-dark dark:bg-primary-light' : 'bg-primary-light dark:bg-primary-dark'}`}
      onClick={onClick}
      aria-label={`${label}`}
    >
      <Icon
        className={`fill-background-light dark:fill-background-dark transition-all duration-150 ease-in-out ${bounce ? "animate-bounce" : ""}`}
      />
      <span>{count}</span>
    </button>
  );
};

const PostCard = ({ post }: PostCardProps) => {
  const [likes, setLikes] = useState(post.reactions.likes);
  const [dislikes, setDislikes] = useState(post.reactions.dislikes);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [bounce, setBounce] = useState({ like: false, dislike: false });

  const handleLike = useCallback(() => {
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    if (disliked) setDislikes((prev) => prev - 1);
    setLiked((prev) => !prev);
    setDisliked(false);
    setBounce((prev) => ({ ...prev, like: true }));
    setTimeout(() => setBounce((prev) => ({ ...prev, like: false })), 500);
  }, [liked, disliked]);

  const handleDislike = useCallback(() => {
    setDislikes((prev) => (disliked ? prev - 1 : prev + 1));
    if (liked) setLikes((prev) => prev - 1);
    setDisliked((prev) => !prev);
    setLiked(false);
    setBounce((prev) => ({ ...prev, dislike: true }));
    setTimeout(() => setBounce((prev) => ({ ...prev, dislike: false })), 500);
  }, [liked, disliked]);

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
        <ReactionButton
          type="like"
          count={likes}
          onClick={handleLike}
          isActive={liked}
          bounce={bounce.like}
          label={`${liked ? "Undo like" : "Like"} this post`}
        />
        <ReactionButton
          type="dislike"
          count={dislikes}
          onClick={handleDislike}
          isActive={disliked}
          bounce={bounce.dislike}
          label={`${disliked ? "Undo dislike" : "Dislike"} this post`}
        />
      </div>
    </div>
  );
};

export default PostCard;
