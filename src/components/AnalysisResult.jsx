import React, { useState } from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  ChevronDown, 
  ChevronUp, 
  Pill,
  ShieldAlert,
  AlertCircle
} from 'lucide-react';

const DrugCard = ({ drug }) => {
  const [expanded, setExpanded] = useState(false);
  
  const getVerdictColors = (verdict) => {
    switch (verdict) {
      case 'appropriate': return 'bg-green-100 text-green-800 border-green-200';
      case 'caution': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'not_recommended': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={`border rounded-lg mb-4 overflow-hidden shadow-sm transition-all ${getVerdictColors(drug.verdict).replace('bg-', 'border-').split(' ')[0]}`}>
      <div 
        className={`p-4 cursor-pointer flex justify-between items-center ${expanded ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-50`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center space-x-3">
          <Pill className="text-teal-600 h-5 w-5" />
          <h4 className="font-semibold text-lg text-gray-900">{drug.drugName}</h4>
          <span className={`text-xs px-2 py-1 rounded-full uppercase font-bold tracking-wider ${getVerdictColors(drug.verdict)}`}>
            {drug.verdict.replace('_', ' ')}
          </span>
        </div>
        {expanded ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
      </div>
      
      {expanded && (
        <div className="p-4 border-t border-gray-100 bg-white">
          <p className="text-gray-700 mb-4">{drug.reasoning}</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {drug.sideEffects && drug.sideEffects.length > 0 && (
              <div className="bg-orange-50 p-3 rounded-md border border-orange-100">
                <h5 className="font-semibold text-orange-800 text-sm mb-2 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" /> Side Effects
                </h5>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {drug.sideEffects.map((effect, idx) => (
                    <li key={idx}>{effect}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {drug.contraindications && drug.contraindications.length > 0 && (
              <div className="bg-red-50 p-3 rounded-md border border-red-100">
                <h5 className="font-semibold text-red-800 text-sm mb-2 flex items-center">
                  <ShieldAlert className="h-4 w-4 mr-1" /> Contraindications
                </h5>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {drug.contraindications.map((contra, idx) => (
                    <li key={idx}>{contra}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const AnalysisResult = ({ result }) => {
  if (!result) return null;

  const getOverallStyle = (verdict) => {
    switch (verdict) {
      case 'appropriate':
        return { bg: 'bg-green-600', icon: CheckCircle, text: 'Prescription Appears Appropriate', accent: 'text-green-600' };
      case 'caution':
        return { bg: 'bg-yellow-500', icon: AlertTriangle, text: 'Prescription Requires Caution', accent: 'text-yellow-600' };
      case 'not_recommended':
        return { bg: 'bg-red-600', icon: XCircle, text: 'Prescription Not Recommended', accent: 'text-red-600' };
      default:
        return { bg: 'bg-gray-500', icon: AlertCircle, text: 'Analysis Complete', accent: 'text-gray-600' };
    }
  };

  const style = getOverallStyle(result.overallVerdict);
  const Icon = style.icon;

  const getInteractionColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'severe': return 'bg-red-100 border-red-300 text-red-900';
      case 'moderate': return 'bg-orange-100 border-orange-300 text-orange-900';
      case 'mild': return 'bg-yellow-100 border-yellow-300 text-yellow-900';
      default: return 'bg-gray-100 border-gray-300 text-gray-900';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Overall Verdict Banner */}
      <div className={`${style.bg} text-white rounded-lg shadow-lg overflow-hidden`}>
        <div className="px-6 py-4 flex items-center space-x-4">
          <Icon className="h-8 w-8 flex-shrink-0" />
          <h2 className="text-2xl font-bold">{style.text}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3 border-b pb-2">Analysis Summary</h3>
            <p className="text-gray-700 leading-relaxed">{result.summary}</p>
          </div>

          {/* Drug Analysis */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 px-1">Drug-by-Drug Analysis</h3>
            {result.drugAnalysis && result.drugAnalysis.map((drug, index) => (
              <DrugCard key={index} drug={drug} />
            ))}
          </div>

          {/* Recommendations */}
          {result.recommendations && result.recommendations.length > 0 && (result.overallVerdict === 'caution' || result.overallVerdict === 'not_recommended') && (
            <div className="bg-teal-50 p-6 rounded-lg shadow-sm border border-teal-100">
              <h3 className="text-xl font-bold text-teal-900 mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-teal-600" />
                Recommended Alternatives
              </h3>
              <div className="space-y-4">
                {result.recommendations.map((rec, index) => (
                  <div key={index} className="bg-white p-4 rounded border border-teal-200">
                    <h4 className="font-semibold text-gray-800 mb-2">For {rec.condition}:</h4>
                    <ul className="space-y-3">
                      {rec.suggestedDrugs.map((drug, dIndex) => (
                        <li key={dIndex} className="text-sm">
                          <span className="font-bold text-teal-700">{drug.name}</span> 
                          <span className="text-gray-500 ml-2">({drug.dosage})</span>
                          <p className="text-gray-600 mt-1">{drug.reasoning}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Sidebar Area */}
        <div className="space-y-6">
          
          {/* Confidence Score */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">AI Confidence Score</h3>
            <div className="flex items-end justify-center space-x-1 mb-3">
              <span className={`text-4xl font-bold ${style.accent}`}>{result.confidenceScore}</span>
              <span className="text-xl text-gray-400 mb-1">%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${result.confidenceScore > 80 ? 'bg-green-500' : result.confidenceScore > 60 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                style={{ width: `${result.confidenceScore}%` }}
              ></div>
            </div>
          </div>

          {/* Interactions */}
          {result.interactions && result.interactions.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center border-b pb-2">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                Interactions
              </h3>
              <div className="space-y-3 mt-4">
                {result.interactions.map((interaction, index) => (
                  <div key={index} className={`p-3 rounded border ${getInteractionColor(interaction.severity)}`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-sm">{interaction.drugs.join(' + ')}</span>
                      <span className="text-xs uppercase font-bold px-2 py-0.5 rounded bg-white bg-opacity-50">
                        {interaction.severity}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{interaction.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warnings */}
          {result.warnings && result.warnings.length > 0 && (
            <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-100">
              <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center">
                <XCircle className="h-5 w-5 mr-2" />
                Critical Warnings
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-red-800 mt-2">
                {result.warnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>

      {/* Disclaimer */}
      {result.disclaimer && (
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500 italic max-w-3xl mx-auto">
            {result.disclaimer}
          </p>
        </div>
      )}
    </div>
  );
};

export default AnalysisResult;
