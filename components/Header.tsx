import React from 'react';
import Link from 'next/link';
import { auth } from '@/auth';
import Logout from '@/components/Buttons/Logout';
import Logo from '@/components/Logo';
import ThemeToggle from "@/components/Buttons/ThemeToggle";
import CustomLink from '@/components/Buttons/CustomLink';

const Header = async () => {
  const session = await auth();

  return (
    <header className="bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark border-b border-solid border-primary-light dark:border-primary-dark top-0 z-50 h-fit lg:h-screen w-full lg:w-[25%] lg:border-b-0 lg:border-r lg:border-solid lg:border-primary-light dark:lg:border-primary-dark fixed min-h-[80px]">
      <nav className={`flex justify-between items-center p-4 h-full flex-col lg:gap-4 relative ${session?.user ? 'gap-8' : ''}`}>
        <Link href="/" aria-label="Go to Homepage">
          <Logo />
          <span className="sr-only">Go to Homepage</span>
        </Link>
        <ul className="flex justify-between items-center gap-16 lg:flex-col lg:gap-4 lg:pb-8">
          {session?.user && (
            <li><CustomLink href="/dashboard" label='Go to dashboard'>Dashboard</CustomLink></li>
          )}
          {session?.user && (
            <li><CustomLink href="/posts" label='Go to posts'>Posts</CustomLink></li>
          )}
          {session?.user ? (
            <li className='absolute top-4 right-6'>
              <Logout />
            </li>
          ) : (
            <li className='absolute top-4 right-6 lg:right-8'><CustomLink href="/sign-in" label='Go to Sign in page'>Sign in</CustomLink></li>
          )}
          <li className='absolute top-4 left-6'>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
