import { Info, ShieldAlert, Cpu, Code } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center border-b pb-4">
        <Info className="w-8 h-8 mr-3 text-medical-600" /> About the Platform
      </h1>

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Cpu className="w-5 h-5 mr-2 text-medical-500" /> How It Works
          </h2>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-gray-600 leading-relaxed space-y-4">
            <p>
              The AI Medical Prescription Analyzer uses advanced natural language processing to evaluate relationships between a patient's symptoms, medical history, and prescribed medications.
            </p>
            <p>
              When you submit a prescription, the AI acts as a secondary verification system. It checks the appropriateness of the drug for the stated symptoms, verifies the dosage against the patient's age and weight, and cross-references multiple medications to detect potential harmful interactions.
            </p>
          </div>
        </section>

        <section>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl shadow-sm">
            <h2 className="text-lg font-bold text-red-800 mb-2 flex items-center">
              <ShieldAlert className="w-5 h-5 mr-2" /> Medical Disclaimer
            </h2>
            <p className="text-red-700 text-sm leading-relaxed">
              This application is designed as an assistive tool for educational and informational purposes only. The AI-generated analysis <strong>DOES NOT</strong> constitute professional medical advice, diagnosis, or treatment. 
              Always consult with a qualified healthcare provider or pharmacist regarding medical conditions and before making any changes to prescribed medications. Do not disregard professional medical advice or delay seeking it because of information provided by this tool.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Code className="w-5 h-5 mr-2 text-medical-500" /> Technology Stack
          </h2>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <ul className="grid grid-cols-2 gap-4 text-gray-600">
              <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-medical-500 mr-2"></span> React 18</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-medical-500 mr-2"></span> Tailwind CSS</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-medical-500 mr-2"></span> React Router v6</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-medical-500 mr-2"></span> Lucide React Icons</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-medical-500 mr-2"></span> Netlify Functions</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-medical-500 mr-2"></span> OpenAI API / LLM</li>
            </ul>
          </div>
        </section>
        
        <div className="text-center text-sm text-gray-400 pt-8 border-t">
          <p>Version 1.0.0 &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}
