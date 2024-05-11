'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  RegisterLink,
  LoginLink,
  LogoutLink
} from '@kinde-oss/kinde-auth-nextjs/components'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

function Header () {
  const { user } = useKindeBrowserClient()
  useEffect(() => {
    console.log(user)
  }, [user])
  const Menu = [
    {
      id: 1,
      name: 'Home',
      path: '/'
    },
    {
      id: 2,
      name: 'Explore',
      path: '/'
    },
    {
      id: 3,
      name: 'Contact Us',
      path: '/'
    }
  ]
  return (
    <div className='flex items-center justify-between p-4 shadow-sm'>
      <div className='flex items-center gap-4'>
        <Image src='/logo.svg' alt='logo' width={80} height={80} />
        <h1 className='text-teal-500 font-extrabold text-3xl font-serif'>
          EasyDoc
        </h1>
        <ul className='md:flex gap-10 hidden'>
          <br />
          {Menu.map((item, index) => (
            <Link href={item.path}>
              <li className='hover:text-teal-400 cursor-pointer hover:scale-105 transition-all ease-in-out'>
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {user ? (
        <Popover>
          <PopoverTrigger>
          <Image src='/user.png'
              alt='profile-image'
              width={70}
              height={70}
              className='rounded-full'/> 
          </PopoverTrigger>
          <PopoverContent className='w-44'>
            <ul className='flex flex-col gap-2'>
            <Link  href={'/my-booking'} className='cursor-pointer hover:bg-slate-100 p-2 rounded-md '>
                My Booking
              </Link>
              <li className='cursor-pointer hover:bg-slate-100 p-2 rounded-md '>
                <LogoutLink>
                  Logout
                </LogoutLink>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      ) : (
        <LoginLink>
          <Button>Get Started</Button>
        </LoginLink>
      )}
    </div>
  )
}

export default Header
