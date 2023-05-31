import Input from "@/components/Input";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

const Success = () => {
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();
  const shrinKode = getCookie("shrinkCookie");

  useEffect(() => {
    if (!shrinKode) {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
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
      <Link href="/">
        <div className="mt-1">
          <span className="cursor-pointer text-sm font-light text-purple-500 underline">
            Shrink another link!
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Success;
