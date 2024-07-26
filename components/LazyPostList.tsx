import React from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
  reactions: {
    likes: number;
    dislikes: number;
  };
  userId: number;
}

const LazyPostList = ({ posts, lastPostElementRef, isFetching }: { posts: Post[]; lastPostElementRef: (node: HTMLLIElement) => void; isFetching: boolean }) => {
  return (
    <ul>
      {posts.map((post, index) => (
        <li className="post" key={post.id} ref={index === posts.length - 1 ? lastPostElementRef : null}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <p>Likes: {post.reactions.likes}</p>
          <p>Dislikes: {post.reactions.dislikes}</p>
        </li>
      ))}
      {isFetching && <p>Loading more posts...</p>}
    </ul>
  );
};

export default LazyPostList;
