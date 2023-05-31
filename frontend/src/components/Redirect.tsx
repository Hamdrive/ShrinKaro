import Link from "next/link";
import React from "react";

const Redirect = () => {
  return (
    <div className="flex flex-col items-center">
      OOPS! You&apos;ve ended up on an unknown route.
      <Link href="/">
        <span className="text-purple-500 underline">Take me back!</span>
      </Link>
    </div>
  );
};

export default Redirect;
