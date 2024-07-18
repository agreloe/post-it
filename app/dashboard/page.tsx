import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const Dashboard = async () => {
    const session = await auth()
    if(!session?.user) {
        redirect('/')
    }
  return (
    <div>
        <h1>Dashboard Page</h1>
        <p>Hello {session?.user?.email}</p>
    </div>
  )
}

export default Dashboard