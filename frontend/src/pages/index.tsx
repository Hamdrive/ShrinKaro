import React, { useState } from "react";
import Image from "next/image";
import ArrowSolidIcon from "../assets/arrowSolid.svg";
import SpinLoader from "@/components/SpinLoader";
import axios from "axios";
import { useRouter } from "next/router";
import Input from "@/components/Input";

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
        window.sessionStorage.setItem(
          "shrinKode",
          JSON.stringify(res.data.data.shrinKode)
        );
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
    <>
      <div className="flex items-center justify-center rounded-lg border border-gray-300 focus-within:ring-1 focus-within:ring-pink-500">
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
          <div className="m-3" onClick={handleSubmission}>
            <Image
              src={ArrowSolidIcon}
              alt="Click to submit link"
              className="h-10 w-12 cursor-pointer rounded-full p-1 hover:bg-gray-200"
            />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
          Make sure your link is properly formatted, ex:
          &apos;`https://www.google.com&apos;`.
        </p>
      )}
    </>
  );
}
