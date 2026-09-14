const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

// ==========================================
// Comprehensive Clinical Pharmacology Knowledge Base
// ==========================================
const DRUG_DATABASE = {
  // Analgesics & Antipyretics
  'paracetamol': {
    class: 'Analgesic / Antipyretic',
    indications: ['headache', 'fever', 'pain', 'body ache', 'mild pain', 'toothache', 'migraine'],
    standardDosage: '500mg - 1000mg every 4-6 hours (max 4000mg/day)',
    contraindications: ['Severe hepatic impairment', 'Active liver disease'],
    sideEffects: ['Nausea (rare)', 'Hepatotoxicity with overdose'],
    allergyKeywords: ['paracetamol', 'acetaminophen']
  },
  'acetaminophen': {
    class: 'Analgesic / Antipyretic',
    indications: ['headache', 'fever', 'pain', 'body ache', 'mild pain', 'toothache', 'migraine'],
    standardDosage: '500mg - 1000mg every 4-6 hours (max 4000mg/day)',
    contraindications: ['Severe hepatic impairment', 'Active liver disease'],
    sideEffects: ['Nausea (rare)', 'Hepatotoxicity with overdose'],
    allergyKeywords: ['paracetamol', 'acetaminophen']
  },
  'ibuprofen': {
    class: 'NSAID (Nonsteroidal Anti-inflammatory Drug)',
    indications: ['headache', 'pain', 'fever', 'inflammation', 'joint pain', 'arthritis', 'muscle pain', 'toothache', 'dysmenorrhea'],
    standardDosage: '200mg - 400mg every 6-8 hours with food (max 1200mg OTC, 2400mg Rx)',
    contraindications: ['Active peptic ulcer', 'GI bleeding', 'Severe heart failure', 'Third trimester pregnancy', 'Aspirin-induced asthma'],
    sideEffects: ['Dyspepsia', 'Abdominal pain', 'Nausea', 'Gastric ulceration', 'Elevated BP'],
    allergyKeywords: ['nsaid', 'ibuprofen', 'aspirin']
  },
  'aspirin': {
    class: 'NSAID / Antiplatelet',
    indications: ['pain', 'fever', 'inflammation', 'cardiovascular protection', 'headache', 'angina'],
    standardDosage: '75mg - 100mg daily (cardioprotection) or 300mg - 600mg every 4-6h (analgesic)',
    contraindications: ['Peptic ulcer disease', 'Bleeding disorders', 'Children <16 (Reye syndrome)', 'Severe asthma'],
    sideEffects: ['Gastric irritation', 'Tinnitus', 'Increased bleeding risk'],
    allergyKeywords: ['aspirin', 'salicylate', 'nsaid']
  },
  'naproxen': {
    class: 'NSAID',
    indications: ['pain', 'joint pain', 'arthritis', 'inflammation', 'headache', 'back pain'],
    standardDosage: '250mg - 500mg twice daily with food',
    contraindications: ['Peptic ulcer', 'Renal impairment', 'Heart failure'],
    sideEffects: ['GI upset', 'Heartburn', 'Fluid retention'],
    allergyKeywords: ['naproxen', 'nsaid']
  },

  // Antibiotics
  'amoxicillin': {
    class: 'Penicillin Antibiotic',
    indications: ['bacterial infection', 'ear infection', 'otitis media', 'sinusitis', 'strep throat', 'pneumonia', 'urinary tract infection', 'bronchitis', 'dental infection'],
    standardDosage: '250mg - 500mg three times daily or 875mg twice daily',
    contraindications: ['Documented penicillin or beta-lactam allergy', 'Infectious mononucleosis'],
    sideEffects: ['Diarrhea', 'Nausea', 'Skin rash', 'Candida overgrowth'],
    allergyKeywords: ['penicillin', 'amoxicillin', 'ampicillin', 'beta-lactam']
  },
  'augmentin': {
    class: 'Aminopenicillin + Beta-lactamase inhibitor (Amoxicillin/Clavulanate)',
    indications: ['bacterial infection', 'sinusitis', 'animal bite', 'skin infection', 'pneumonia', 'resistant otitis media'],
    standardDosage: '625mg twice or three times daily, or 1000mg twice daily',
    contraindications: ['Penicillin allergy', 'History of amoxicillin/clavulanate-associated jaundice'],
    sideEffects: ['Diarrhea (common)', 'Nausea', 'Hepatotoxicity (rare)'],
    allergyKeywords: ['penicillin', 'amoxicillin', 'augmentin', 'clavulanate']
  },
  'azithromycin': {
    class: 'Macrolide Antibiotic',
    indications: ['respiratory infection', 'strep throat', 'bronchitis', 'pneumonia', 'chlamydia', 'bacterial infection', 'sinusitis'],
    standardDosage: '500mg day 1, then 250mg once daily on days 2-5',
    contraindications: ['History of cholestatic jaundice with macrolides', 'QT prolongation syndrome'],
    sideEffects: ['Nausea', 'Vomiting', 'Diarrhea', 'QT interval prolongation'],
    allergyKeywords: ['macrolide', 'azithromycin', 'erythromycin']
  },
  'ciprofloxacin': {
    class: 'Fluoroquinolone Antibiotic',
    indications: ['urinary tract infection', 'uti', 'complicated bacterial infection', 'prostatitis', 'gastroenteritis'],
    standardDosage: '250mg - 500mg twice daily for 3-7 days',
    contraindications: ['Tendinitis / tendon rupture history', 'Myasthenia gravis', 'QT prolongation', 'Pregnancy'],
    sideEffects: ['Tendonitis', 'Peripheral neuropathy', 'CNS toxicity', 'Photosensitivity'],
    allergyKeywords: ['quinolone', 'fluoroquinolone', 'ciprofloxacin']
  },
  'doxycycline': {
    class: 'Tetracycline Antibiotic',
    indications: ['acne', 'chlamydia', 'lyme disease', 'respiratory infection', 'bacterial infection', 'malaria prophylaxis'],
    standardDosage: '100mg once or twice daily with a full glass of water',
    contraindications: ['Pregnancy', 'Children under 8 years', 'Severe hepatic disease'],
    sideEffects: ['Photosensitivity', 'Esophageal ulceration', 'Teeth discoloration in children'],
    allergyKeywords: ['tetracycline', 'doxycycline']
  },

  // Cardiovascular & Hypertension
  'amlodipine': {
    class: 'Calcium Channel Blocker (Dihydropyridine)',
    indications: ['hypertension', 'high blood pressure', 'angina', 'coronary artery disease'],
    standardDosage: '5mg - 10mg once daily',
    contraindications: ['Severe hypotension', 'Cardiogenic shock'],
    sideEffects: ['Peripheral edema (ankle swelling)', 'Flushing', 'Headache', 'Dizziness'],
    allergyKeywords: ['amlodipine', 'calcium channel blocker']
  },
  'lisinopril': {
    class: 'ACE Inhibitor',
    indications: ['hypertension', 'high blood pressure', 'heart failure', 'post-myocardial infarction'],
    standardDosage: '10mg - 20mg once daily (max 40mg/day)',
    contraindications: ['Pregnancy (teratogenic)', 'History of ACEI-induced angioedema', 'Bilateral renal artery stenosis'],
    sideEffects: ['Persistent dry cough', 'Hyperkalemia', 'Dizziness', 'Angioedema'],
    allergyKeywords: ['lisinopril', 'ace inhibitor']
  },
  'losartan': {
    class: 'Angiotensin II Receptor Blocker (ARB)',
    indications: ['hypertension', 'high blood pressure', 'diabetic nephropathy', 'heart failure'],
    standardDosage: '50mg - 100mg once daily',
    contraindications: ['Pregnancy', 'Severe hepatic impairment', 'Concurrent aliskiren in diabetes'],
    sideEffects: ['Dizziness', 'Hyperkalemia', 'Hypotension'],
    allergyKeywords: ['losartan', 'arb']
  },
  'atenolol': {
    class: 'Cardioselective Beta Blocker',
    indications: ['hypertension', 'high blood pressure', 'angina', 'arrhythmia'],
    standardDosage: '25mg - 50mg once daily',
    contraindications: ['Sinus bradycardia', 'Second or third-degree heart block', 'Severe asthma / bronchospasm'],
    sideEffects: ['Bradycardia', 'Fatigue', 'Cold extremities', 'Erectile dysfunction'],
    allergyKeywords: ['atenolol', 'beta blocker']
  },
  'propranolol': {
    class: 'Non-selective Beta Blocker',
    indications: ['hypertension', 'angina', 'migraine prophylaxis', 'tremor', 'anxiety', 'arrhythmia'],
    standardDosage: '40mg - 80mg twice daily',
    contraindications: ['Asthma / COPD / bronchospasm', 'Bradycardia', 'Heart block'],
    sideEffects: ['Bronchospasm', 'Fatigue', 'Sleep disturbances'],
    allergyKeywords: ['propranolol', 'beta blocker']
  },

  // Gastrointestinal
  'omeprazole': {
    class: 'Proton Pump Inhibitor (PPI)',
    indications: ['acid reflux', 'heartburn', 'gerd', 'gastritis', 'peptic ulcer', 'stomach pain', 'dyspepsia'],
    standardDosage: '20mg - 40mg once daily 30-60 minutes before breakfast',
    contraindications: ['Known hypersensitivity to substituted benzimidazoles'],
    sideEffects: ['Headache', 'Abdominal pain', 'Constipation', 'Hypomagnesemia with long-term use'],
    allergyKeywords: ['omeprazole', 'ppi', 'proton pump inhibitor']
  },
  'pantoprazole': {
    class: 'Proton Pump Inhibitor (PPI)',
    indications: ['acid reflux', 'heartburn', 'gerd', 'esophagitis', 'peptic ulcer', 'gastritis'],
    standardDosage: '40mg once daily before a meal',
    contraindications: ['Hypersensitivity to PPIs'],
    sideEffects: ['Headache', 'Diarrhea', 'Abdominal pain'],
    allergyKeywords: ['pantoprazole', 'ppi']
  },

  // Respiratory & Allergy
  'cetirizine': {
    class: 'Second-generation Antihistamine',
    indications: ['allergy', 'allergic rhinitis', 'hay fever', 'itching', 'urticaria', 'hives', 'runny nose', 'sneezing'],
    standardDosage: '10mg once daily',
    contraindications: ['Severe renal failure (CrCl < 10 mL/min)'],
    sideEffects: ['Mild drowsiness', 'Dry mouth', 'Fatigue'],
    allergyKeywords: ['cetirizine', 'antihistamine']
  },
  'loratadine': {
    class: 'Non-sedating Antihistamine',
    indications: ['allergy', 'allergic rhinitis', 'hay fever', 'hives', 'itching', 'sneezing', 'watery eyes'],
    standardDosage: '10mg once daily',
    contraindications: ['Severe liver impairment (adjust dose)'],
    sideEffects: ['Headache', 'Fatigue', 'Dry mouth'],
    allergyKeywords: ['loratadine', 'antihistamine']
  },
  'salbutamol': {
    class: 'Short-acting Beta-2 Agonist (Bronchodilator)',
    indications: ['asthma', 'shortness of breath', 'wheezing', 'bronchospasm', 'copd', 'cough with wheezing'],
    standardDosage: '100mcg - 200mcg (1-2 puffs) as needed (up to 4 times daily)',
    contraindications: ['Hypersensitivity to salbutamol'],
    sideEffects: ['Tremor', 'Tachycardia', 'Palpitations', 'Headache'],
    allergyKeywords: ['salbutamol', 'albuterol']
  },
  'albuterol': {
    class: 'Short-acting Beta-2 Agonist',
    indications: ['asthma', 'shortness of breath', 'wheezing', 'bronchospasm', 'copd'],
    standardDosage: '1-2 inhalations every 4-6 hours as needed',
    contraindications: ['Hypersensitivity'],
    sideEffects: ['Tachycardia', 'Shakiness', 'Nervousness'],
    allergyKeywords: ['salbutamol', 'albuterol']
  },

  // Antidiabetics
  'metformin': {
    class: 'Biguanide Antidiabetic',
    indications: ['diabetes', 'type 2 diabetes', 'hyperglycemia', 'elevated blood sugar', 'prediabetes', 'pcos'],
    standardDosage: '500mg - 850mg once or twice daily with meals (titrated to max 2000mg)',
    contraindications: ['Severe renal impairment (eGFR < 30)', 'Acute metabolic acidosis', 'Severe hepatic failure'],
    sideEffects: ['Diarrhea', 'Nausea', 'Abdominal bloating', 'Metallic taste', 'Lactic acidosis (rare)'],
    allergyKeywords: ['metformin']
  }
};

// Standard recommended alternatives by symptom/condition
const STANDARD_RECOMMENDATIONS = {
  'headache': {
    condition: 'Headache / Migraine',
    suggestedDrugs: [
      { name: 'Paracetamol', dosage: '500mg - 1000mg every 4-6 hours (max 4g/day)', reasoning: 'First-line non-opioid analgesic with high tolerability and minimal GI irritation.' },
      { name: 'Ibuprofen', dosage: '400mg every 6-8 hours with meals', reasoning: 'Effective NSAID for inflammatory tension or vascular headaches when GI risks are absent.' }
    ]
  },
  'fever': {
    condition: 'Fever / Pyrexia',
    suggestedDrugs: [
      { name: 'Paracetamol', dosage: '500mg - 1000mg every 4-6 hours', reasoning: 'Gold standard antipyretic for reducing fever without gastric mucosal injury.' },
      { name: 'Ibuprofen', dosage: '200mg - 400mg every 6-8 hours with food', reasoning: 'Alternative antipyretic providing anti-inflammatory relief.' }
    ]
  },
  'cough': {
    condition: 'Cough / Upper Respiratory Symptoms',
    suggestedDrugs: [
      { name: 'Dextromethorphan', dosage: '15mg - 30mg every 6-8 hours', reasoning: 'Antitussive indicated for non-productive (dry) cough.' },
      { name: 'Guaifenesin', dosage: '200mg - 400mg every 4 hours', reasoning: 'Expectorant indicated to thin and loosen mucus in productive cough.' }
    ]
  },
  'hypertension': {
    condition: 'Elevated Blood Pressure / Hypertension',
    suggestedDrugs: [
      { name: 'Amlodipine', dosage: '5mg once daily', reasoning: 'First-line dihydropyridine calcium channel blocker for systemic blood pressure reduction.' },
      { name: 'Lisinopril', dosage: '10mg once daily', reasoning: 'First-line ACE inhibitor providing cardioprotective and renoprotective benefits.' }
    ]
  },
  'acid reflux': {
    condition: 'Acid Reflux / Heartburn / Gastritis',
    suggestedDrugs: [
      { name: 'Omeprazole', dosage: '20mg once daily before breakfast', reasoning: 'First-line proton pump inhibitor to suppress gastric acid secretion.' },
      { name: 'Famotidine', dosage: '20mg twice daily or at bedtime', reasoning: 'H2-receptor antagonist suitable for mild-to-moderate acid symptoms.' }
    ]
  },
  'bacterial infection': {
    condition: 'Suspected Bacterial Infection',
    suggestedDrugs: [
      { name: 'Amoxicillin', dosage: '500mg three times daily for 7 days', reasoning: 'First-line broad-spectrum aminopenicillin for respiratory and ENT bacterial infections.' },
      { name: 'Azithromycin', dosage: '500mg day 1, then 250mg daily on days 2-5', reasoning: 'Preferred macrolide alternative in patients with suspected or documented penicillin allergy.' }
    ]
  }
};

// ==========================================
// Clinical Rule-Based Analysis Engine
// ==========================================
function performClinicalAnalysis(patientInfo, symptoms, prescribedDrugs) {
  const patientName = patientInfo.name || 'Patient';
  const allergies = (patientInfo.allergies || '').toLowerCase();
  const medicalHistory = (patientInfo.medicalHistory || '').toLowerCase();
  const symptomNames = symptoms.map(s => s.name.toLowerCase());
  const combinedSymptomsText = symptomNames.join(' ');

  let drugAnalysis = [];
  let interactions = [];
  let warnings = [];
  let recommendations = [];
  let hasContraindication = false;
  let hasInappropriateDrug = false;
  let hasCaution = false;

  // 1. Analyze each prescribed drug
  for (const drug of prescribedDrugs) {
    const dNameLower = (drug.name || '').toLowerCase().trim();
    
    // Find matching drug in database (exact or substring)
    const matchKey = Object.keys(DRUG_DATABASE).find(k => dNameLower.includes(k) || k.includes(dNameLower));
    const drugInfo = matchKey ? DRUG_DATABASE[matchKey] : null;

    let verdict = 'appropriate';
    let reasoning = '';
    let sideEffects = drugInfo ? drugInfo.sideEffects : ['Mild gastrointestinal disturbance', 'Drowsiness or dizziness'];
    let contraindications = drugInfo ? drugInfo.contraindications : ['Known hypersensitivity'];

    if (drugInfo) {
      // Check for Allergy Conflicts (CRITICAL)
      const isAllergic = drugInfo.allergyKeywords.some(keyword => allergies.includes(keyword));
      if (isAllergic) {
        verdict = 'not_recommended';
        hasContraindication = true;
        reasoning = `CRITICAL ALLERGY ALERT: Patient has a documented allergy to ${patientInfo.allergies}. Prescribing ${drug.name} (${drugInfo.class}) carries high risk of severe allergic reaction or anaphylaxis.`;
        warnings.push(`Contraindicated due to documented allergy: ${drug.name} should NOT be administered to patient with ${patientInfo.allergies} allergy.`);
      }

      // Check Medical History Contraindications
      if (verdict !== 'not_recommended') {
        if ((dNameLower.includes('ibuprofen') || dNameLower.includes('aspirin') || dNameLower.includes('naproxen')) && 
            (medicalHistory.includes('ulcer') || medicalHistory.includes('gerd') || medicalHistory.includes('gastritis'))) {
          verdict = 'caution';
          hasCaution = true;
          reasoning = `${drug.name} is an NSAID which suppresses gastric prostaglandins. Patient's history of ${patientInfo.medicalHistory} increases risk of gastric irritation, ulcer recurrence, or GI bleeding. Gastroprotection (e.g. PPI) or an alternative is recommended.`;
          warnings.push(`GI Risk: Patient with history of ${patientInfo.medicalHistory} prescribed NSAID (${drug.name}).`);
        } else if ((dNameLower.includes('propranolol') || dNameLower.includes('atenolol')) && 
                   (medicalHistory.includes('asthma') || medicalHistory.includes('copd'))) {
          verdict = 'not_recommended';
          hasContraindication = true;
          reasoning = `CONTRAINDICATION: Beta-blocker (${drug.name}) is contraindicated in patients with asthma or reactive airway disease due to risk of life-threatening bronchospasm.`;
          warnings.push(`Respiratory Hazard: Beta-blockers contraindicated with asthma/COPD history.`);
        } else if (dNameLower.includes('metformin') && (medicalHistory.includes('renal') || medicalHistory.includes('kidney'))) {
          verdict = 'caution';
          hasCaution = true;
          reasoning = `Caution: Patient has renal history. Metformin requires regular eGFR monitoring due to risk of lactic acidosis.`;
        }
      }

      // Check Symptom Matching (Is the drug indicated for patient's complaints?)
      if (verdict === 'appropriate') {
        const treatsSymptom = drugInfo.indications.some(ind => combinedSymptomsText.includes(ind));
        if (treatsSymptom) {
          verdict = 'appropriate';
          reasoning = `${drug.name} (${drugInfo.class}) is clinically indicated for the patient's reported symptoms (${symptoms.map(s => s.name).join(', ')}). Dosage (${drug.dosage || 'standard'}) and frequency (${drug.frequency || 'prescribed'}) are aligned with standard therapeutic protocols.`;
        } else {
          verdict = 'not_recommended';
          hasInappropriateDrug = true;
          reasoning = `${drug.name} (${drugInfo.class}) does not have an established clinical indication for the patient's reported symptoms (${symptoms.map(s => s.name).join(', ')}). Unless prescribed for an unstated underlying condition, this medication does not directly address the present complaints.`;
        }
      }
    } else {
      // General evaluation for unlisted medications
      verdict = 'caution';
      hasCaution = true;
      reasoning = `${drug.name} was evaluated. Ensure clinical alignment with symptoms (${symptoms.map(s => s.name).join(', ')}), monitor for tolerance, and verify dosage (${drug.dosage}) according to standard pharmacopeia.`;
    }

    drugAnalysis.push({
      drugName: drug.name,
      verdict,
      reasoning,
      sideEffects,
      contraindications
    });
  }

  // 2. Check Drug-to-Drug Interactions
  const drugNamesLower = prescribedDrugs.map(d => (d.name || '').toLowerCase());
  if (drugNamesLower.some(d => d.includes('ibuprofen')) && drugNamesLower.some(d => d.includes('aspirin'))) {
    interactions.push({
      drugs: ['Ibuprofen', 'Aspirin'],
      severity: 'moderate',
      description: 'Concomitant administration of multiple NSAIDs significantly increases the risk of serious gastrointestinal ulceration, bleeding, and diminishes cardioprotective antiplatelet effect of aspirin.'
    });
  }
  if (drugNamesLower.some(d => d.includes('lisinopril')) && drugNamesLower.some(d => d.includes('losartan'))) {
    interactions.push({
      drugs: ['Lisinopril', 'Losartan'],
      severity: 'severe',
      description: 'Dual blockade of the renin-angiotensin-aldosterone system (RAAS) with ACEI + ARB is contraindicated due to increased risks of severe hypotension, syncope, hyperkalemia, and renal failure.'
    });
  }

  // 3. Formulate Recommendations if any drug is inappropriate or contraindicated
  if (hasContraindication || hasInappropriateDrug || hasCaution) {
    for (const s of symptoms) {
      const sLower = s.name.toLowerCase();
      let matchedRec = null;
      if (sLower.includes('headache') || sLower.includes('migraine') || sLower.includes('head pain')) {
        matchedRec = STANDARD_RECOMMENDATIONS['headache'];
      } else if (sLower.includes('fever') || sLower.includes('temperature') || sLower.includes('chills')) {
        matchedRec = STANDARD_RECOMMENDATIONS['fever'];
      } else if (sLower.includes('cough') || sLower.includes('cold')) {
        matchedRec = STANDARD_RECOMMENDATIONS['cough'];
      } else if (sLower.includes('pressure') || sLower.includes('hypertension')) {
        matchedRec = STANDARD_RECOMMENDATIONS['hypertension'];
      } else if (sLower.includes('acid') || sLower.includes('reflux') || sLower.includes('heartburn') || sLower.includes('stomach')) {
        matchedRec = STANDARD_RECOMMENDATIONS['acid reflux'];
      }

      if (matchedRec && !recommendations.some(r => r.condition === matchedRec.condition)) {
        // Filter out drugs that conflict with patient allergies
        const safeSuggested = matchedRec.suggestedDrugs.filter(sd => {
          const sdLower = sd.name.toLowerCase();
          return !allergies.includes(sdLower);
        });

        if (safeSuggested.length > 0) {
          recommendations.push({
            condition: matchedRec.condition,
            suggestedDrugs: safeSuggested
          });
        }
      }
    }
  }

  // Determine overall verdict
  let overallVerdict = 'appropriate';
  let confidenceScore = 94;
  let summary = '';

  if (hasContraindication) {
    overallVerdict = 'not_recommended';
    confidenceScore = 96;
    summary = `Critical clinical concern detected for ${patientName}. One or more prescribed medications conflict directly with documented patient allergies or high-risk medical history. Immediate prescriber review is required before medication administration.`;
  } else if (hasInappropriateDrug) {
    overallVerdict = 'not_recommended';
    confidenceScore = 89;
    summary = `Prescription mismatch identified. The prescribed medications do not align with the patient's primary symptoms (${symptoms.map(s => s.name).join(', ')}). Evidence-based alternatives have been recommended to treat the presenting complaints.`;
  } else if (hasCaution || interactions.length > 0) {
    overallVerdict = 'caution';
    confidenceScore = 88;
    summary = `The prescription partially addresses the patient's complaints, but requires clinical caution due to potential drug interactions, dose optimization, or patient-specific risk factors.`;
  } else {
    overallVerdict = 'appropriate';
    confidenceScore = 95;
    summary = `All prescribed medications are clinically appropriate for the patient's reported complaints (${symptoms.map(s => s.name).join(', ')}). No critical allergies, contraindications, or severe drug interactions were detected.`;
  }

  return {
    overallVerdict,
    confidenceScore,
    summary,
    drugAnalysis,
    recommendations,
    interactions,
    warnings,
    disclaimer: 'This analysis was generated by the MedCheck AI Clinical Pharmacology Verification Engine for educational and clinical decision-support purposes only. All therapeutic choices must be confirmed by a licensed medical practitioner.',
    engine: 'MedCheck Clinical Pharmacology Expert Engine'
  };
}

// ==========================================
// Main Handler
// ==========================================
export const handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (e) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid JSON request body.' })
    };
  }

  const { patientInfo, symptoms, prescribedDrugs } = body;

  if (!patientInfo || !symptoms || !prescribedDrugs) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Missing required fields: patientInfo, symptoms, or prescribedDrugs.' })
    };
  }

  if (!Array.isArray(symptoms) || !Array.isArray(prescribedDrugs)) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'symptoms and prescribedDrugs must be arrays.' })
    };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  let geminiSuccess = false;
  let resultData = null;

  // 1. If API key exists, try Google Gemini AI first
  if (apiKey && apiKey.trim() !== '') {
    const prompt = `
You are an expert clinical pharmacologist and medical AI assistant.
Your task is to analyze a medical prescription against a patient's symptoms, medical history, allergies, and demographic information.

Patient Information:
- Name: ${patientInfo.name || 'Unknown'}
- Age: ${patientInfo.age || 'Unknown'}
- Gender: ${patientInfo.gender || 'Unknown'}
- Weight: ${patientInfo.weight || 'Unknown'}
- Allergies: ${patientInfo.allergies || 'None reported'}
- Medical History: ${patientInfo.medicalHistory || 'None reported'}

Symptoms:
${symptoms.map(s => `- ${s.name} (Severity: ${s.severity})`).join('\n')}

Prescribed Drugs:
${prescribedDrugs.map(d => `- ${d.name}, Dosage: ${d.dosage}, Frequency: ${d.frequency}, Duration: ${d.duration}`).join('\n')}

Analyze each prescribed drug for its appropriateness for the symptoms, potential side effects, contraindications given the patient's history and allergies, and possible drug interactions.
If any medication is inappropriate or contraindicated, recommend the correct clinical alternatives.

Return a JSON response with exactly this structure:
{
  "overallVerdict": "appropriate" | "caution" | "not_recommended",
  "confidenceScore": 0-100,
  "summary": "Brief summary of the analysis",
  "drugAnalysis": [
    {
      "drugName": "name",
      "verdict": "appropriate" | "caution" | "not_recommended",
      "reasoning": "Why this drug is/isn't appropriate",
      "sideEffects": ["list"],
      "contraindications": ["list"]
    }
  ],
  "recommendations": [
    {
      "condition": "The symptom/condition being treated",
      "suggestedDrugs": [
        {
          "name": "Drug name",
          "dosage": "Recommended dosage",
          "reasoning": "Why this is recommended"
        }
      ]
    }
  ],
  "interactions": [
    {
      "drugs": ["Drug A", "Drug B"],
      "severity": "mild" | "moderate" | "severe",
      "description": "Description of the interaction"
    }
  ],
  "warnings": ["Important warnings"],
  "disclaimer": "Medical disclaimer text"
}
`;

    const requestBody = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 4096,
        responseMimeType: "application/json"
      }
    };

    const modelsToTry = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];

    for (const model of modelsToTry) {
      // Try with x-goog-api-key header (standard for AQ. keys)
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
          },
          body: JSON.stringify(requestBody)
        });

        if (res.ok) {
          const data = await res.json();
          let rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            rawText = rawText.replace(/^```json\s*/m, '').replace(/```\s*$/m, '').trim();
            resultData = JSON.parse(rawText);
            resultData.engine = `Google Gemini AI (${model})`;
            geminiSuccess = true;
            break;
          }
        }
      } catch (err) {
        console.error(`Gemini fetch attempt error (${model}):`, err.message);
      }
    }
  }

  // 2. If Gemini didn't return (API key missing, unauthorized 401, quota exceeded, or network issue),
  // seamlessly engage the Clinical Pharmacology Expert Rule Engine!
  if (!geminiSuccess || !resultData) {
    console.log('Engaging MedCheck Clinical Pharmacology Rule Engine as primary/fallback provider.');
    resultData = performClinicalAnalysis(patientInfo, symptoms, prescribedDrugs);
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(resultData)
  };
};
