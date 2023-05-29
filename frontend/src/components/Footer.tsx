import React from "react";

const Footer = () => {
  return (
    <div className="-mt-24 w-full">
      <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto" />
      <span className="flex justify-center whitespace-pre text-base text-gray-500 dark:text-gray-400 sm:text-center">
        Made with ❤️ by&nbsp;
        <a href="https://peerlist.io/hamza" className="hover:underline">
          Hamza
        </a>
      </span>
    </div>
  );
};

export default Footer;
