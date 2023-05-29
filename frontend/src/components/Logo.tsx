import Link from 'next/link';
import React from "react";

const Logo = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Link href='/'>
        <div className="text-5xl font-extrabold">
          <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            ShrinKaro
          </span>
        </div>
      </Link>
      <div className="mt-4 text-base font-normal">
        <span className="text-gray-950">Shrink your links in one go!</span>
      </div>
    </div>
  );
};

export default Logo;
