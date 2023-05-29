import Input from "@/components/Input";
import Link from 'next/link';
import React, { useState } from "react";

const Success = () => {
  const [isCopied, setIsCopied] = useState(false);
  const shrinKode = typeof window !== "undefined" && JSON.parse(window.sessionStorage.getItem("shrinKode")!);

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className="flex items-center justify-center rounded-lg border border-gray-300">
        <Input disabled={true} value={`shrinkaro.vercel.app/${shrinKode}`} />
        <button
          type="button"
          className=" mx-3 rounded-lg bg-pink-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-pink-600 focus:outline-none "
          onClick={() => {
            navigator.clipboard.writeText(`shrinkaro.vercel.app/${shrinKode}`);
            setIsCopied(true);
            window.sessionStorage.removeItem("shrinKode");
          }}
        >
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </div>
      <Link href='/'>
      <div className='mt-1'>
        <span className="text-sm font-light text-purple-500 underline cursor-pointer">
          Shrink another link!
        </span>
      </div>
      </Link>
    </div>
  );
};

export default Success;
