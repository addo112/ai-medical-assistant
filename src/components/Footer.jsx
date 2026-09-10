import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-6 w-6 text-teal-500" />
              <span className="font-bold text-xl text-white">MedCheck AI</span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              Advanced AI-powered prescription analysis to help identify potential drug interactions, contraindications, and provide evidence-based recommendations.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-teal-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/analyze" className="text-sm hover:text-teal-400 transition-colors">
                  Analyze Prescription
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-sm hover:text-teal-400 transition-colors">
                  Analysis History
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-teal-400 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Disclaimer */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Important Notice
            </h3>
            <div className="text-sm text-gray-400 p-3 bg-gray-800 rounded border border-gray-700">
              <p>
                This tool is not a replacement for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider regarding medical conditions or treatments.
              </p>
            </div>
          </div>
          
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800 text-sm text-center text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} MedCheck AI. All rights reserved.</p>
          <p className="mt-2 md:mt-0 italic">For educational purposes only.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
