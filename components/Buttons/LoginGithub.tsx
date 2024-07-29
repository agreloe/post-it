"use client";

import React from 'react'
import { FaGithub } from '@react-icons/all-files/fa/FaGithub'
import { login } from "@/actions/auth";

const LoginGithub = () => {

  const handleLogin = () => {
    login('github');
  };

  return (
    <button className='relative cursor-pointer px-4 py-2 border transition-colors duration-150 ease-in-out z-10
    border-primary-light dark:border-primary-dark
    bg-background-light dark:bg-background-dark
    text-text-light dark:text-text-dark
    overflow-hidden
    group w-fit flex items-center mx-auto mt-4' onClick={handleLogin} type="button" aria-label='Login with Github'>
        <FaGithub className="mr-2 fill-primary-light dark:fill-primary-dark group-hover:fill-background-light dark:group-hover:fill-background-dark transition-colors duration-150 ease-in-out" />
        <span className="relative z-10 group-hover:text-background-light dark:group-hover:text-background-dark transition-colors duration-150 ease-in-out">Login with Github</span>
        <div className="absolute top-0 left-0 h-full w-full bg-primary-light dark:bg-primary-dark transition-all duration-300 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-left z-[-1]"></div>
    </button>
  )
}

export default LoginGithub