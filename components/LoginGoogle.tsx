"use client";

import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import { login } from "@/actions/auth";

const LoginGoogle = () => {

  return (
    <button className='flex items-center justify-between gap-2 w-fit bg-slate-400' onClick={()=>login('github')} type="button">
        <FaGoogle className="mr-2" />
        <span>Login with Google</span>
    </button>
  )
}

export default LoginGoogle