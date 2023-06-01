import React, { useState } from "react";
import Image from "next/image";
import ArrowSolidIcon from "../assets/arrowSolid.svg";
import SpinLoader from "@/components/SpinLoader";
import axios from "axios";
import { useRouter } from "next/router";
import Input from "@/components/Input";
import { setCookie } from "cookies-next";

export default function Home() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleSubmission = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_SHRINK!,
        { url: value },
        { headers: { "content-type": "application/x-www-form-urlencoded" } }
      );
      if (res.data.data.shrinKode) {
        const shrinkCookie = res.data.data.shrinKode;
        setCookie("shrinkCookie", shrinkCookie, { maxAge: 60 });
        router.push("/success");
      }
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setLoading(false);
      setValue("");
    }
  };
  return (
    <div className="flex flex-col items-center w-full justify-center">
      <div className="flex items-center w-full justify-center rounded-lg border border-gray-300 focus-within:ring-1 focus-within:ring-pink-500">
        <Input
          onChange={(e) => {
            error && setError(false);
            setValue(e.currentTarget.value);
          }}
          value={value}
          disabled={loading}
        />
        {loading ? (
          <div className="m-3">
            <SpinLoader />
          </div>
        ) : (
          <button
            className="m-3"
            disabled={value.length === 0}
            onClick={handleSubmission}
          >
            <Image
              src={ArrowSolidIcon}
              alt="Click to submit link"
              className={`h-10 w-12  rounded-full p-1 hover:bg-gray-200 ${
                value ? "cursor-pointer" : "cursor-not-allowed"
              }`}
            />
          </button>
        )}
      </div>
      {error && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
          Make sure your link is properly formatted, ex: https://www.google.com.
        </p>
      )}
    </div>
  );
}
