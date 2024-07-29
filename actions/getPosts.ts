'use server';

import { Post } from '@/types';
import axiosInstance from '@/lib/axios';

export const getPosts = async (skip: number, limit: number): Promise<Post[]> => {
  const response = await axiosInstance.get(`/posts?skip=${skip}&limit=${limit}`);
  return response.data.posts;
};
