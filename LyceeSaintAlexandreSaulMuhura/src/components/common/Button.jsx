import React, { useState } from "react";

const DropdownButton = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setDropdownVisible(true)}
      onMouseLeave={() => setDropdownVisible(false)}
    >
      <button className='px-4 h-8 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600'>
        Sign Up
      </button>
      {isDropdownVisible && (
        <div className="absolute top-9 left-0 bg-white border shadow-lg py-2 px-4 rounded-lg">
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
