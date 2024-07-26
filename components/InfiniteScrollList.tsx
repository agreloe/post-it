'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { getPosts } from '@/actions/getPosts';
import { Post } from '@/types';
import '../styles/infiniteScrollList.css';
import PostCard from '@/components/PostCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ScrollToTopButton from '@/components/Buttons/ScrollToTopButton';

type PostListProps = {
  initialPosts: Post[];
};

const NUMBER_OF_POSTS_TO_FETCH = 10;

const InfiniteScrollList = ({ initialPosts }: PostListProps) => {
  const [skip, setSkip] = useState(NUMBER_OF_POSTS_TO_FETCH);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const { ref, inView } = useInView();
  const postsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);

  const loadMorePosts = async () => {
    const newPosts = await getPosts(skip, NUMBER_OF_POSTS_TO_FETCH);
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setSkip(skip + NUMBER_OF_POSTS_TO_FETCH);
  };

  useEffect(() => {
    if (inView) {
      loadMorePosts();
    }
  }, [inView]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);

          }
        });
      },
      { threshold: 0.1 }
    );

    postsRef.current.forEach((postElement) => {
      if (postElement) {
        observer.observe(postElement);
      }

    });

    return () => observer.disconnect();
  }, [posts]);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1500);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className='flex flex-col gap-6'>
      <div className={`fixed bottom-4 right-4 lg:right-[52px] transition-opacity duration-500 ease-in-out ${isScrolling ? 'opacity-100' : 'opacity-0'}`}>
        <ScrollToTopButton />
      </div>
      {posts.map((post, index) => (
        <div
          key={post.id}
          ref={(el) => {
            if (el) postsRef.current[index] = el;
          }}
          className="post"
        >
          <PostCard post={post}></PostCard>
        </div>
      ))}
      <div ref={ref}>
        <LoadingSpinner />
      </div>
    </div>
  );
};

export default InfiniteScrollList;
