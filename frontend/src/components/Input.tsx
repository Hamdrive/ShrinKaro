import React from "react";

interface InputProps {
  value: string;
  onChange?: (e: any) => void;
  disabled?: boolean;
}

const Input = ({value, disabled, onChange}: InputProps) => {
  return (
    <input
      type="text"
      id="large-input"
      placeholder="Enter link here"
      className="sm:text-md block w-full rounded-lg bg-gray-50 px-3 py-5 text-gray-900 outline-none disabled:cursor-default disabled:text-gray-400"
      onChange={onChange}
      value={value}
      disabled={disabled}
    ></input>
  );
};

export default Input;
