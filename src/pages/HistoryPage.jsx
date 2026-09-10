import { useState, useEffect } from 'react';
import { Trash2, FileText, ChevronDown, ChevronUp, Calendar, User } from 'lucide-react';
import AnalysisResult from '../components/AnalysisResult';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('medcheck-history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      localStorage.removeItem('medcheck-history');
      setHistory([]);
    }
  };

  const deleteEntry = (id, e) => {
    e.stopPropagation();
    const newHistory = history.filter(item => item.id !== id);
    localStorage.setItem('medcheck-history', JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  const toggleExpand = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getVerdictColor = (verdict) => {
    const v = (verdict || '').toLowerCase();
    if (v.includes('safe') || v.includes('appropriate')) return 'bg-green-100 text-green-800 border-green-200';
    if (v.includes('warning') || v.includes('caution')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (v.includes('danger') || v.includes('contraindicate')) return 'bg-red-100 text-red-800 border-red-200';
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FileText className="w-8 h-8 mr-3 text-medical-600" /> Analysis History
          </h1>
          <p className="text-gray-500 mt-2">Past prescription analyses saved locally.</p>
        </div>
        {history.length > 0 && (
          <button onClick={clearHistory} className="text-red-600 hover:bg-red-50 px-4 py-2 rounded-md transition text-sm font-medium flex items-center border border-transparent hover:border-red-200">
            <Trash2 className="w-4 h-4 mr-2" /> Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-medium text-gray-700 mb-2">No History Found</h2>
          <p className="text-gray-500">Your past analyses will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((entry) => (
            <div key={entry.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md">
              <div 
                className="p-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                onClick={() => toggleExpand(entry.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h3 className="font-bold text-lg text-gray-800 flex items-center">
                      <User className="w-4 h-4 mr-1 text-gray-400" />
                      {entry.patientInfo?.name || 'Anonymous Patient'} 
                      <span className="text-sm font-normal text-gray-500 ml-2">({entry.patientInfo?.age} yrs, {entry.patientInfo?.gender})</span>
                    </h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(entry.date)}
                    <span className="mx-2">•</span>
                    <span>{entry.prescribedDrugs?.length || 0} Meds</span>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end md:w-1/3">
                  {entry.result && entry.result.overallVerdict && (
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getVerdictColor(entry.result.overallVerdict)}`}>
                      {entry.result.overallVerdict}
                    </span>
                  )}
                  <div className="flex items-center ml-4 space-x-2">
                    <button onClick={(e) => deleteEntry(entry.id, e)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition">
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="p-2 text-gray-400">
                      {expandedId === entry.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>
              </div>

              {expandedId === entry.id && (
                <div className="border-t border-gray-100 p-5 bg-gray-50">
                  <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2 border-b pb-1">Symptoms</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {entry.symptoms?.map(s => <li key={s.id}>{s.name} ({s.severity})</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2 border-b pb-1">Medications</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {entry.prescribedDrugs?.map(d => <li key={d.id}>{d.name} - {d.dosage}</li>)}
                      </ul>
                    </div>
                  </div>
                  {entry.result && (
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <AnalysisResult result={entry.result} />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
