import React from 'react'
import LoginForm from '@/components/LoginForm'

const SignIn = () => {
  return (
    <main className='bg-custom flex flex-col items-center justify-center h-screen absolute top-0 left-0 w-full lg:left-[25%] lg:w-[75%] px-8 py-16'>
        <LoginForm />
    </main>
  )
}

export default SignIn