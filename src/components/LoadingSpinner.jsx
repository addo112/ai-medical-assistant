import React from 'react';
import { Activity } from 'lucide-react';

const LoadingSpinner = ({ message = "Analyzing..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 space-y-6">
      
      {/* Custom CSS Animation for Medical Cross/Pulse */}
      <div className="relative">
        <div className="absolute inset-0 bg-teal-200 rounded-full animate-ping opacity-75"></div>
        <div className="relative bg-white rounded-full p-4 shadow-lg border-2 border-teal-100">
          <Activity className="h-10 w-10 text-teal-600 animate-pulse" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <h3 className="text-xl font-bold text-gray-800">{message}</h3>
          
          {/* Bouncing dots */}
          <div className="flex space-x-1 mt-1">
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm animate-pulse">
          This may take a few seconds...
        </p>
      </div>

    </div>
  );
};

export default LoadingSpinner;
