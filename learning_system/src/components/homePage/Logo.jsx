import React from 'react';
import logo from "../../assets/logo_remove_background.png";

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <img
          src={logo}
          className="w-full h-8 object-cover rounded-lg mb-4"
        />
    </div>
  );
};

export default Logo