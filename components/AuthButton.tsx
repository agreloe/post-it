"use client"
import React from 'react'
import { useFormStatus } from 'react-dom'

const AuthButton = () => {
    const { pending } = useFormStatus()
  return (
    <button disabled={pending} type="submit">
      {pending ? 'Loading...' : 'Sign In'}
    </button>
  )
}

export default AuthButton