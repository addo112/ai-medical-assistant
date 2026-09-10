import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

const MedicalDisclaimer = ({ compact = false }) => {
  const disclaimerText = "This tool is for educational and informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider.";

  if (compact) {
    return (
      <div className="flex items-start text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-200">
        <Info className="h-4 w-4 mr-2 flex-shrink-0 text-gray-400" />
        <p><strong>Disclaimer:</strong> {disclaimerText}</p>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 shadow-sm rounded-r-md my-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-6 w-6 text-amber-500" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-amber-800 uppercase tracking-wider">
            Medical Disclaimer
          </h3>
          <div className="mt-2 text-sm text-amber-700 leading-relaxed">
            <p>
              {disclaimerText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDisclaimer;
