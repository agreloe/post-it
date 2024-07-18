import React from 'react'
import Link from 'next/link'
import { auth } from '@/auth'
import Logout from '@/components/Logout'

const Header = async () => {
    const session = await auth()
  return (
    <header className='bg-slate-600 text-white'>
        <nav className='flex justify-between items-center p-4'>
            <Link href="/">Home</Link>
            <ul className='flex items-center gap-4'>
                <li><Link href="/dashboard">Dashboard</Link></li>
                {
                    session?.user ? (
                        <li>
                            <Logout />
                        </li>
                    ) : (
                        <li><Link href="/sign-in">Sign in</Link></li>
                    )
                }
            </ul>

        </nav>
    </header>
  )
}

export default Header