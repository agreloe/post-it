import React from 'react';
import { auth } from '@/auth';
import PostsChart from "@/components/PostsChart";
import PostsLikesChart from "@/components/PostsLikesChart";

const Dashboard = async () => {
    const session = await auth()

  return (
    <main className="bg-custom flex flex-col items-center absolute top-0 left-0 w-full lg:left-[25%] lg:w-[75%] px-8 py-16 mt-[118px] h-fit lg:mt-0 lg:h-auto">
      <div className='flex flex-col gap-8 bg-background-light dark:bg-background-dark p-8 lg:p-24 border border-solid border-primary-light dark:border-primary-dark w-full lg:mt-0 text-text-light dark:text-text-dark break-all'>
        <div className="flex items-baseline flex-wrap gap-2">
          <h1 className='font-bold text-4xl lg:text-6xl'>Hello,</h1>
          <span className='text-xl font-bold lg:text-6xl pb-4'>{session?.user?.email}</span>
        </div>
        <p className="pb-4">Welcome to Post it. Here are the stats of the week. We have more and more Posters and likes everyday. Let's see how it goes.</p>
      <PostsChart />
      <PostsLikesChart />
      </div>

    </main>
  )
}

export default Dashboard