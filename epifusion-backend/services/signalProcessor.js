const credibilityScorer = require("../utils/credibilityScorer");

function extractSignal(text) {
  const lower = text.toLowerCase();
  let disease = "Unknown";
  let location = "Unknown";

  if (lower.includes("pneumonia")) disease = "Pneumonia";
  if (lower.includes("cough") || lower.includes("fever")) disease = "Respiratory Illness";
  if (lower.includes("toronto")) location = "Toronto";
  if (lower.includes("delhi")) location = "Delhi";

  const risk_score = Math.random() * 0.5 + 0.5; // random between 0.5–1.0
  const credibility = credibilityScorer.scoreSource(text);

  return {
    disease,
    location,
    risk_score: parseFloat(risk_score.toFixed(2)),
    credibility
  };
}

module.exports = { extractSignal };
