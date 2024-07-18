import React from 'react'
import LoginGoogle from '@/components/LoginGoogle'
import LoginForm from '@/components/LoginForm'

const SignIn = () => {
  return (
    <div className='flex flex-col gap-4'>
        <h1 className='text-4xl font-bold'>Sign In</h1>
        <LoginGoogle />
        <LoginForm />
    </div>
  )
}

export default SignIn