import { Link } from 'react-router-dom';
import { Brain, ShieldCheck, Pill, AlertTriangle, Activity, Database, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-medical-700 text-white py-20 px-4 md:px-8 shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">AI-Powered Prescription Analyzer</h1>
          <p className="text-xl md:text-2xl mb-10 text-medical-100 max-w-2xl mx-auto">
            Intelligently evaluate prescriptions against patient symptoms, medical history, and check for drug interactions using advanced AI.
          </p>
          <Link to="/analyze" className="inline-flex items-center px-8 py-4 bg-white text-medical-700 font-bold rounded-full text-lg shadow-lg hover:bg-medical-50 transition transform hover:-translate-y-1">
            <Activity className="mr-2 h-6 w-6" /> Start Analysis
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-medical-100 hover:shadow-xl transition">
            <div className="bg-medical-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <Brain className="h-8 w-8 text-medical-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Smart Analysis</h3>
            <p className="text-gray-600">AI carefully evaluates prescribed medications against patient symptoms to ensure appropriate treatment paths.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-medical-100 hover:shadow-xl transition">
            <div className="bg-medical-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="h-8 w-8 text-medical-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Drug Verification</h3>
            <p className="text-gray-600">Cross-references medications with known databases to verify dosages and suitability for specific demographics.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-medical-100 hover:shadow-xl transition">
            <div className="bg-medical-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <Pill className="h-8 w-8 text-medical-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Alternative Recommendations</h3>
            <p className="text-gray-600">Suggests more effective, safer, or more modern alternative treatments when applicable.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-medical-100 hover:shadow-xl transition">
            <div className="bg-medical-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="h-8 w-8 text-medical-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Interaction Detection</h3>
            <p className="text-gray-600">Automatically flags potentially dangerous combinations, contraindications, and allergy risks.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-medical-50 py-16 px-4 md:px-8 border-y border-medical-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
            <div className="flex-1 flex flex-col items-center max-w-xs">
              <div className="w-16 h-16 rounded-full bg-medical-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Patient Profile</h3>
              <p className="text-gray-600 text-center">Enter patient information, medical history, allergies, and current symptoms.</p>
            </div>
            <div className="hidden md:block w-16 border-t-2 border-dashed border-medical-300 mt-8"></div>
            <div className="flex-1 flex flex-col items-center max-w-xs">
              <div className="w-16 h-16 rounded-full bg-medical-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Add Prescriptions</h3>
              <p className="text-gray-600 text-center">Input the prescribed medications, including dosages, frequency, and duration.</p>
            </div>
            <div className="hidden md:block w-16 border-t-2 border-dashed border-medical-300 mt-8"></div>
            <div className="flex-1 flex flex-col items-center max-w-xs">
              <div className="w-16 h-16 rounded-full bg-medical-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Get Results</h3>
              <p className="text-gray-600 text-center">Receive instant AI analysis, interaction warnings, and evidence-based recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-gradient-to-br from-medical-500 to-medical-700 p-8 rounded-2xl shadow-lg text-white">
            <Brain className="h-10 w-10 mx-auto mb-4 text-medical-100" />
            <h3 className="text-xl font-semibold mb-1">AI-Powered</h3>
            <p className="text-medical-100">Advanced Analysis</p>
          </div>
          <div className="bg-gradient-to-br from-teal-500 to-teal-700 p-8 rounded-2xl shadow-lg text-white">
            <Database className="h-10 w-10 mx-auto mb-4 text-teal-100" />
            <h3 className="text-xl font-semibold mb-1">Comprehensive</h3>
            <p className="text-teal-100">Drug Database</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 rounded-2xl shadow-lg text-white">
            <Zap className="h-10 w-10 mx-auto mb-4 text-emerald-100" />
            <h3 className="text-xl font-semibold mb-1">Instant</h3>
            <p className="text-emerald-100">Actionable Results</p>
          </div>
        </div>
      </section>
    </div>
  );
}
