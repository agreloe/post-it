import InfiniteScrollList from '@/components/InfiniteScrollList';
import { Suspense } from 'react';
import { getPosts } from '@/actions/getPosts';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorBoundary from '@/components/ErrorBoundary';

const INITIAL_NUMBER_OF_POSTS = 10

const Posts = async () => {
  const initialPosts = await getPosts(0, INITIAL_NUMBER_OF_POSTS);

  return (
    <ErrorBoundary>
      <main className="bg-custom flex flex-col items-center absolute top-0 left-0 w-full lg:left-[25%] lg:w-[75%] px-8 py-16 mt-[118px] h-fit lg:mt-0 lg:h-auto">
      <div className='flex flex-col gap-8 bg-background-light  dark:bg-background-dark p-8 lg:p-24 border border-solid border-primary-light dark:border-primary-dark w-full lg:mt-0'>
        <h1 className='text-text-light dark:text-text-dark font-bold text-4xl lg:text-6xl pb-4'>Here are the posts</h1>
        <Suspense fallback={<LoadingSpinner />}>
          <InfiniteScrollList initialPosts={initialPosts} />
        </Suspense>
      </div>
      </main>
    </ErrorBoundary>
  );
};

export default Posts;
