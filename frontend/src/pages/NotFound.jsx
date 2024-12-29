import React from 'react';
import Robot from '../assets/robot.gif'

const NotFound = () => {
  return (
    <div className="items-center justify-center">
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">404 - Page Not Found</span>
      </h2>
     <a href="/"><img src={Robot} alt="robot" /></a>
    </div>
  );
};

export default NotFound;
