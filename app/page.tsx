import React from 'react';
import { auth } from '@/auth';
import CustomLink from '@/components/Buttons/CustomLink';

export default async function Home() {
  const session = await auth()

  return (
    <main className="bg-custom flex flex-col items-center justify-center h-screen absolute top-0 left-0 w-full lg:left-[25%] lg:w-[75%] px-8">
      <div className="bg-background-light  dark:bg-background-dark p-16 lg:p-24 border border-solid border-primary-light dark:border-primary-dark w-full lg:w-[60%]">
        <h1 className="text-text-light dark:text-text-dark font-bold text-4xl lg:text-6xl pb-4">Welcome to Post it.</h1>
        <p className="text-text-light dark:text-text-dark font-normal pb-4">
          This is a simple application to see people&apos;s ideas and thoughts.
        </p>
        {
          session?.user && (
              <CustomLink href="/posts" label="Go to posts">See what people are posting</CustomLink>
          )
        }
      </div>
    </main>
  );
}
