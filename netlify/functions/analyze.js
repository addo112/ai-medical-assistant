const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

exports.handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'API key is not configured.' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { patientInfo, symptoms, prescribedDrugs } = body;

    // Input validation
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

    // Construct the prompt
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
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 4096,
        responseMimeType: "application/json"
      }
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API Error:', errorData);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: 'Error calling Gemini API.' })
      };
    }

    const data = await response.json();
    
    // Extract response text
    let responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseText) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Invalid response from Gemini API.' })
      };
    }
    
    // Attempt to parse if it's stringified JSON inside markdown, though responseMimeType usually guarantees plain JSON
    let parsedResult;
    try {
      // Remove possible markdown formatting if present despite responseMimeType
      responseText = responseText.replace(/^\`\`\`json/m, '').replace(/\`\`\`$/m, '').trim();
      parsedResult = JSON.parse(responseText);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Raw response text:', responseText);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to parse Gemini response as JSON.' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(parsedResult)
    };

  } catch (error) {
    console.error('Function Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal Server Error', message: error.message })
    };
  }
};
