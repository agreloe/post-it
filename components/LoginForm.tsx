import React from 'react'
import AuthButton from '@/components/AuthButton'
import { loginWithCredentials } from '@/actions/auth'

const LoginForm = () => {
  return (
    <div className='flex flex-col gap-4'>
        <form action={loginWithCredentials}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Email" required />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Password" required />
            </div>
            <div>
                <AuthButton />
            </div>

        </form>
    </div>
  )
}

export default LoginForm