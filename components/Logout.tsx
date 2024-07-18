"use client";

import React from 'react'
import {logout} from '@/actions/auth'

const Logout = () => {
  return (
    <button type="button" onClick={()=> logout()}>Logout</button>
  )
}

export default Logout