"use client"
import React from 'react';
import Link from 'next/link'

const Navbar = () => {
    return (
        <div>
           <nav className="bg-white  py-4 px-6 flex justify-between items-center shadow-2xl">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        BlogPlatform
      </Link>
      <div className='flex gap-8'>
          <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link href="/create" className="text-gray-700 hover:text-blue-600">Create Post</Link>
        <Link href="/posts" className="text-gray-700 hover:text-blue-600">All post</Link>
      </div>
      <div className="flex gap-4">
        
        <Link href="/login" className="text-gray-700 hover:text-blue-600">
        Login
        </Link>
      </div>
    </nav>  
        </div>
    );
};

export default Navbar;