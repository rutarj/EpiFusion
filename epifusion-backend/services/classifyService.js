import dotenv from 'dotenv';
dotenv.config();

export async function classifyAlert(alert, callback) {
  const is_alert = alert.risk_score >= 0.7 && alert.credibility === 'High';

  const prompt = `
You are an AI assistant for outbreak classification.

Given:
- Disease: ${alert.disease}
- Location: ${alert.location}
- Risk Score: ${alert.risk_score}
- Credibility: ${alert.credibility}

Explain in one sentence why this outbreak ${is_alert ? 'should' : 'should not'} be an alert.
Return a valid, readable sentence.
  `;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    // Not used — we fallback anyway
    const data = await response.json();

    const explanation = is_alert
      ? 'This case meets alert conditions based on high risk and credibility.'
      : 'This case does not meet alert conditions based on risk and credibility.';

    callback(null, { is_alert, explanation });
  } catch (error) {
    console.error('❌ Gemini error:', error);

    // Still use fallback explanation
    const explanation = is_alert
      ? 'This case meets alert conditions based on high risk and credibility.'
      : 'This case does not meet alert conditions based on risk and credibility.';

    callback(null, { is_alert, explanation });
  }
}
