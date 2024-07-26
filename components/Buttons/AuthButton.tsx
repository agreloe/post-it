"use client"
import React from 'react'
import { useFormStatus } from 'react-dom'

const AuthButton = () => {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={pending}
      type="submit"
      className={`relative cursor-pointer px-4 py-2 border transition-colors duration-150 ease-in-out z-10
        border-primary-light dark:border-primary-dark
        bg-background-light dark:bg-background-dark
        text-text-light dark:text-text-dark
        overflow-hidden
        group`}
      aria-label='Sign into your account'
    >
      <span className="relative z-10 group-hover:text-background-light dark:group-hover:text-background-dark transition-colors duration-150 ease-in-out">
        {pending ? 'Loading...' : 'Sign In'}
      </span>
      <div className="absolute top-0 left-0 h-full w-full bg-primary-light dark:bg-primary-dark transition-all duration-300 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-left z-[-1]"></div>
    </button>
  )
}

export default AuthButton
