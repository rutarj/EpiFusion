// services/geminiService.js
import dotenv from 'dotenv';
dotenv.config();

export async function analyzeTextWithGemini(text) {
  const prompt = `
You are an AI trained to extract disease outbreak information for Toronto from news or social data. Given this text:

"${text}"

Extract the following:
- Disease name
- Location (must be in Toronto)
- Risk score (0–1 scale)
- Credibility (High/Medium/Low)
- Explanation
- Source

Respond in JSON format.
`;

  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + process.env.GOOGLE_API_KEY, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await response.json();
  const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  return JSON.parse(content);
}
