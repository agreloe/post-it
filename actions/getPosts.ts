'use server';

import { Post } from '@/types';

export const getPosts = async (skip: number, limit: number): Promise<Post[]> => {
  const response = await fetch(`https://dummyjson.com/posts?skip=${skip}&limit=${limit}`);
  const data = await response.json();
  return data.posts;
};
