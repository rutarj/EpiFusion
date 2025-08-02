import { NextResponse } from 'next/server'

// Mock AI analysis for Toronto-specific disease detection
async function analyzeTextWithAI(text: string) {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Simple keyword-based analysis for Toronto
  const lowerText = text.toLowerCase()
  
  const diseases = ['pneumonia', 'influenza', 'covid', 'gastroenteritis', 'measles', 'mumps']
  const torontoAreas = ['downtown', 'north york', 'scarborough', 'etobicoke', 'east york', 'york']
  
  let detectedDisease = 'Unknown'
  let detectedArea = 'Toronto'
  let riskScore = 0.3
  let credibility = 'Low'
  
  // Detect disease
  for (const disease of diseases) {
    if (lowerText.includes(disease)) {
      detectedDisease = disease.charAt(0).toUpperCase() + disease.slice(1)
      riskScore = Math.min(0.9, riskScore + 0.4)
      break
    }
  }
  
  // Detect Toronto area
  for (const area of torontoAreas) {
    if (lowerText.includes(area)) {
      detectedArea = area.charAt(0).toUpperCase() + area.slice(1) + ', Toronto, ON'
      break
    }
  }
  
  // Adjust credibility based on keywords
  if (lowerText.includes('hospital') || lowerText.includes('confirmed') || lowerText.includes('official')) {
    credibility = 'High'
    riskScore = Math.min(0.9, riskScore + 0.2)
  } else if (lowerText.includes('reported') || lowerText.includes('suspected')) {
    credibility = 'Medium'
  }
  
  // Generate coordinates based on area
  const coordinates = {
    'Downtown, Toronto, ON': { lat: 43.6532, lng: -79.3832 },
    'North York, Toronto, ON': { lat: 43.7615, lng: -79.4111 },
    'Scarborough, Toronto, ON': { lat: 43.7764, lng: -79.2318 },
    'Etobicoke, Toronto, ON': { lat: 43.6205, lng: -79.5132 },
    'East York, Toronto, ON': { lat: 43.6865, lng: -79.3327 },
    'York, Toronto, ON': { lat: 43.6897, lng: -79.4502 }
  }
  
  const coords = coordinates[detectedArea] || coordinates['Downtown, Toronto, ON']
  
  return {
    disease: detectedDisease,
    location: detectedArea,
    lat: coords.lat,
    lng: coords.lng,
    risk_score: riskScore,
    credibility: credibility,
    source: 'AI Analysis',
    timestamp: new Date().toISOString(),
    explanation: `AI detected potential ${detectedDisease.toLowerCase()} outbreak in ${detectedArea}.`,
    status: 'pending'
  }
}

export async function POST(request: Request) {
  try {
    const { text } = await request.json()
    
    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }
    
    const alert = await analyzeTextWithAI(text)
    return NextResponse.json({ alert })
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json({ error: 'AI analysis failed' }, { status: 500 })
  }
} 