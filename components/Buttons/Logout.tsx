"use client";

import React from 'react'
import {logout} from '@/actions/auth'

const Logout = () => {
  return (
    <button className="text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light underline transition-colors duration-200 ease-in-out" type="button" aria-label="Log out your account" onClick={()=> logout()}>Logout</button>
  )
}

export default Logout