import React from 'react'
import AuthButton from '@/components/Buttons/AuthButton'
import { loginWithCredentials } from '@/actions/auth'
import LoginGoogle from './Buttons/LoginGoogle'

const LoginForm = () => {
  return (
    <div className='flex flex-col gap-4 bg-background-light  dark:bg-background-dark p-16 lg:p-24 border border-solid border-primary-light dark:border-primary-dark w-full lg:w-[60%]'>
        <h1 className=" text-text-light dark:text-text-dark font-bold text-4xl lg:text-6xl pb-4">Sign in to Post it.</h1>
        <form action={loginWithCredentials} className='flex flex-col gap-8 w-full'>
            <div className='flex flex-col gap-2'>
                <label htmlFor="email" className=' text-sm uppercase tracking-wider text-text-light dark:text-text-dark'>Email</label>
                <input type="email" id="email" name="email" placeholder="Email" required autoComplete='on' className="bg-transparent border-b border-solid border-primary-light dark:border-primary-dark focus:border-primary-light dark:focus:border-primary-dark focus:outline-none focus:ring-0 text-sm  text-text-light dark:text-text-dark" />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="password" className=' text-sm uppercase tracking-wider text-text-light dark:text-text-dark'>Password</label>
                <input type="password" id="password" name="password" placeholder="Password" required autoComplete='on' className="bg-transparent border-b border-solid border-primary-light dark:border-primary-dark focus:border-primary-light dark:focus:border-primary-dark focus:outline-none focus:ring-0 text-sm  text-text-light dark:text-text-dark"/>
            </div>
            <div className='ml-auto'>
                <AuthButton />
            </div>

            <span className='w-full h-[1px] bg-primary-light dark:bg-primary-dark rounded-full relative flex justify-center items-center opacity-50'>
                <span className='w-fit h-fit bg-background-light dark:bg-background-dark px-2 text-primary-light dark:text-primary-dark'>or</span>
            </span>


        </form>
        <LoginGoogle />
    </div>
  )
}

export default LoginForm