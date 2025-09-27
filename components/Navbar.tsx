import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { SignedIn, SignInButton, UserButton, SignUpButton, SignedOut } from '@clerk/nextjs';

const Navbar = () => {
  return (
      <nav className="flex items-center justify-between px-4 bg-white sticky top-0 z-50">

        <Link href="/create"> 
          <div className="flex items-center gap-2.5 cursor-pointer">
            <Image src="/next.svg" alt="logo" width={46} height={44} />
          </div>
        </Link>

        <div className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              
              <SignInButton>
                <button className="px-3 py-1.5 rounded-md text-sm border border-gray-300 hover:bg-gray-50">
                Login
                </button>
              </SignInButton>
              
              <SignUpButton>
                <button className="px-3 py-1.5 rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-500">
                  Sign Up
                </button>
              </SignUpButton>

            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
              
            
        </div>

      </nav>

  );
};

export default Navbar;