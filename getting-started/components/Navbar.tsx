"use client";
import Link from 'next/link';
import React from 'react'

const Navbar = () => {
  return (
    <div>
      <div className='bg-slate-900 text-white flex justify-between px-5 py-3'>
        <div className='text-xl '>
          Erudite Works
        </div>
        <div className='flex gap-5'>
        <Link href="/">
        <div className='bg-slate-800 rounded-full px-3 py-1 hover:bg-slate-700 ' >
          Home
        </div>
        </Link>
        <Link href="/products">
        <div className='bg-slate-800 rounded-full px-3 py-1 hover:bg-slate-700 ' >
          Products
        </div>
        </Link>
        </div>
        
      </div>
    </div>
  )
}

export default Navbar