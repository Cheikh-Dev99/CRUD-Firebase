// InputField.jsx
import React from "react";

export default function InputField({ type, placeholder, ...rest }) {
  return (
    <input
      className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 me-2"
      type={type}
      placeholder={placeholder}
      {...rest}
    />
  );
}