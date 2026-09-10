import { useState } from 'react';
import { ChevronRight, ChevronLeft, Plus, X, HeartPulse, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
import AnalysisResult from '../components/AnalysisResult';

export default function AnalyzePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  // Step 1: Patient Info
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    gender: 'Male',
    weight: '',
    allergies: '',
    medicalHistory: ''
  });

  // Step 2: Symptoms
  const [symptoms, setSymptoms] = useState([]);
  const [currentSymptom, setCurrentSymptom] = useState({ name: '', severity: 'Moderate' });

  // Step 3: Medications
  const [prescribedDrugs, setPrescribedDrugs] = useState([]);
  const [currentDrug, setCurrentDrug] = useState({ name: '', dosage: '', frequency: 'Once daily', duration: '' });

  const handlePatientInfoChange = (e) => {
    setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value });
  };

  const addSymptom = () => {
    if (currentSymptom.name.trim()) {
      setSymptoms([...symptoms, { id: Date.now(), ...currentSymptom }]);
      setCurrentSymptom({ name: '', severity: 'Moderate' });
    }
  };

  const removeSymptom = (id) => {
    setSymptoms(symptoms.filter(s => s.id !== id));
  };

  const addDrug = () => {
    if (currentDrug.name.trim()) {
      setPrescribedDrugs([...prescribedDrugs, { id: Date.now(), ...currentDrug }]);
      setCurrentDrug({ name: '', dosage: '', frequency: 'Once daily', duration: '' });
    }
  };

  const removeDrug = (id) => {
    setPrescribedDrugs(prescribedDrugs.filter(d => d.id !== id));
  };

  const validateStep = (step) => {
    if (step === 1) {
      if (!patientInfo.age || !patientInfo.weight) {
        setError('Age and Weight are required.');
        return false;
      }
    } else if (step === 2) {
      if (symptoms.length === 0) {
        setError('Please add at least one symptom.');
        return false;
      }
    } else if (step === 3) {
      if (prescribedDrugs.length === 0) {
        setError('Please add at least one medication.');
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 3) {
        submitAnalysis();
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
    setError('');
  };

  const saveToHistory = (resultData) => {
    const history = JSON.parse(localStorage.getItem('medcheck-history') || '[]');
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      patientInfo,
      symptoms,
      prescribedDrugs,
      result: resultData
    };
    localStorage.setItem('medcheck-history', JSON.stringify([newEntry, ...history]));
  };

  const submitAnalysis = async () => {
    setCurrentStep(4);
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/.netlify/functions/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          patientInfo,
          symptoms,
          prescribedDrugs
        })
      });
      
      if (!response.ok) {
        throw new Error('Analysis request failed. Please try again.');
      }
      
      const data = await response.json();
      setAnalysisResult(data);
      saveToHistory(data);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setPatientInfo({ name: '', age: '', gender: 'Male', weight: '', allergies: '', medicalHistory: '' });
    setSymptoms([]);
    setPrescribedDrugs([]);
    setAnalysisResult(null);
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Stepper */}
      <div className="mb-10 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-0 h-1 bg-medical-500 -z-10 -translate-y-1/2 transition-all duration-300" style={{ width: `${((currentStep - 1) / 3) * 100}%` }}></div>
        <div className="flex justify-between">
          {[1, 2, 3, 4].map(step => (
            <div key={step} className="flex flex-col items-center bg-white px-2">
              <div className={`step-circle ${currentStep === step ? 'step-active' : currentStep > step ? 'step-completed' : 'step-pending'}`}>
                {currentStep > step ? <CheckCircle2 className="w-5 h-5" /> : step}
              </div>
              <span className={`text-xs mt-2 font-medium ${currentStep >= step ? 'text-medical-700' : 'text-gray-400'}`}>
                {step === 1 ? 'Patient' : step === 2 ? 'Symptoms' : step === 3 ? 'Medications' : 'Results'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
        
        {error && (
          <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-lg flex items-center border border-red-200">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Step 1: Patient Info */}
        {currentStep === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Patient Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name (Optional)</label>
                <input type="text" name="name" value={patientInfo.name} onChange={handlePatientInfoChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-medical-500 focus:ring focus:ring-medical-200 p-2 border" placeholder="John Doe" />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                  <input type="number" name="age" value={patientInfo.age} onChange={handlePatientInfoChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-medical-500 focus:ring focus:ring-medical-200 p-2 border" placeholder="30" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg) *</label>
                  <input type="number" name="weight" value={patientInfo.weight} onChange={handlePatientInfoChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-medical-500 focus:ring focus:ring-medical-200 p-2 border" placeholder="70" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select name="gender" value={patientInfo.gender} onChange={handlePatientInfoChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-medical-500 focus:ring focus:ring-medical-200 p-2 border bg-white">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Allergies (Comma separated)</label>
                <textarea name="allergies" value={patientInfo.allergies} onChange={handlePatientInfoChange} rows="2" className="w-full rounded-md border-gray-300 shadow-sm focus:border-medical-500 focus:ring focus:ring-medical-200 p-2 border" placeholder="Penicillin, Peanuts..."></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Medical History</label>
                <textarea name="medicalHistory" value={patientInfo.medicalHistory} onChange={handlePatientInfoChange} rows="3" className="w-full rounded-md border-gray-300 shadow-sm focus:border-medical-500 focus:ring focus:ring-medical-200 p-2 border" placeholder="Hypertension, Asthma..."></textarea>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Symptoms */}
        {currentStep === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Patient Symptoms</h2>
            
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
              <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Symptom Name</label>
                  <input type="text" value={currentSymptom.name} onChange={(e) => setCurrentSymptom({...currentSymptom, name: e.target.value})} onKeyDown={(e) => e.key === 'Enter' && addSymptom()} className="w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-medical-500 focus:ring focus:ring-medical-200" placeholder="e.g. Headache" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                  <div className="flex space-x-2">
                    {['Mild', 'Moderate', 'Severe'].map(sev => (
                      <button key={sev} onClick={() => setCurrentSymptom({...currentSymptom, severity: sev})} className={`px-3 py-2 rounded-md text-sm font-medium border ${currentSymptom.severity === sev ? (sev === 'Mild' ? 'bg-green-100 text-green-800 border-green-300' : sev === 'Moderate' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : 'bg-red-100 text-red-800 border-red-300') : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'}`}>
                        {sev}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={addSymptom} className="bg-medical-600 text-white px-4 py-2 rounded-md hover:bg-medical-700 flex items-center justify-center transition">
                  <Plus className="w-5 h-5 mr-1" /> Add
                </button>
              </div>
            </div>

            <div className="min-h-[150px]">
              {symptoms.length === 0 ? (
                <div className="text-center text-gray-500 py-8 border-2 border-dashed border-gray-200 rounded-xl">
                  No symptoms added yet.
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {symptoms.map(s => (
                    <div key={s.id} className={`flex items-center px-3 py-1.5 rounded-full border shadow-sm ${s.severity === 'Mild' ? 'bg-green-50 border-green-200 text-green-800' : s.severity === 'Moderate' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                      <span className="font-medium mr-2">{s.name}</span>
                      <span className="text-xs uppercase tracking-wider opacity-70 mr-2">{s.severity}</span>
                      <button onClick={() => removeSymptom(s.id)} className="hover:bg-black hover:bg-opacity-10 rounded-full p-0.5 transition">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Medications */}
        {currentStep === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Prescribed Medications</h2>
            
            <div className="bg-medical-50 p-4 rounded-xl border border-medical-100 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Drug Name</label>
                  <input type="text" value={currentDrug.name} onChange={(e) => setCurrentDrug({...currentDrug, name: e.target.value})} className="w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-medical-500 focus:ring focus:ring-medical-200" placeholder="e.g. Amoxicillin" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                  <input type="text" value={currentDrug.dosage} onChange={(e) => setCurrentDrug({...currentDrug, dosage: e.target.value})} className="w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-medical-500 focus:ring focus:ring-medical-200" placeholder="e.g. 500mg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                  <select value={currentDrug.frequency} onChange={(e) => setCurrentDrug({...currentDrug, frequency: e.target.value})} className="w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-medical-500 focus:ring focus:ring-medical-200 bg-white">
                    <option>Once daily</option>
                    <option>Twice daily</option>
                    <option>Three times daily</option>
                    <option>Four times daily</option>
                    <option>Every 4-6 hours</option>
                    <option>As needed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input type="text" value={currentDrug.duration} onChange={(e) => setCurrentDrug({...currentDrug, duration: e.target.value})} onKeyDown={(e) => e.key === 'Enter' && addDrug()} className="w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-medical-500 focus:ring focus:ring-medical-200" placeholder="e.g. 7 days" />
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={addDrug} className="bg-medical-600 text-white px-6 py-2 rounded-md hover:bg-medical-700 flex items-center transition shadow-sm">
                  <Plus className="w-5 h-5 mr-1" /> Add Medication
                </button>
              </div>
            </div>

            <div className="min-h-[150px] space-y-3">
              {prescribedDrugs.length === 0 ? (
                <div className="text-center text-gray-500 py-8 border-2 border-dashed border-gray-200 rounded-xl">
                  No medications added yet.
                </div>
              ) : (
                prescribedDrugs.map(drug => (
                  <div key={drug.id} className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div>
                      <h4 className="font-bold text-gray-800">{drug.name}</h4>
                      <p className="text-sm text-gray-500">{drug.dosage} • {drug.frequency} • {drug.duration}</p>
                    </div>
                    <button onClick={() => removeDrug(drug.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Step 4: Results */}
        {currentStep === 4 && (
          <div className="animate-fade-in min-h-[400px] flex flex-col justify-center">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center space-y-6 py-12">
                <div className="relative">
                  <HeartPulse className="w-20 h-20 text-medical-500 animate-heartbeat" />
                  <div className="absolute inset-0 border-4 border-medical-200 rounded-full animate-ping opacity-20"></div>
                </div>
                <h3 className="text-xl font-medium text-gray-700">Analyzing Prescription...</h3>
                <p className="text-gray-500 text-center max-w-sm">The AI is evaluating symptoms, checking dosages, and scanning for drug interactions.</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Analysis Failed</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">{error}</p>
                <button onClick={() => submitAnalysis()} className="bg-medical-600 text-white px-6 py-3 rounded-md hover:bg-medical-700 flex items-center mx-auto transition shadow-md">
                  <RefreshCw className="w-5 h-5 mr-2" /> Retry Analysis
                </button>
              </div>
            ) : analysisResult ? (
              <div>
                <AnalysisResult result={analysisResult} />
                <div className="mt-8 flex justify-center">
                  <button onClick={resetForm} className="text-medical-600 font-medium hover:text-medical-800 underline">
                    Start a New Analysis
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* Navigation */}
        {currentStep < 4 && (
          <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between">
            <button 
              onClick={handlePrev} 
              disabled={currentStep === 1}
              className={`flex items-center px-4 py-2 rounded-md font-medium transition ${currentStep === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <ChevronLeft className="w-5 h-5 mr-1" /> Previous
            </button>
            <button 
              onClick={handleNext}
              className="flex items-center px-6 py-2 bg-medical-600 text-white rounded-md font-medium hover:bg-medical-700 transition shadow-sm"
            >
              {currentStep === 3 ? 'Analyze' : 'Next'} <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
