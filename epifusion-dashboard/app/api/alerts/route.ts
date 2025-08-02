import { NextResponse } from 'next/server'

// Toronto-specific alert data
const torontoAlerts = [
  {
    id: 'alert-1',
    disease: 'Pneumonia',
    location: 'Downtown Toronto, ON',
    lat: 43.6532,
    lng: -79.3832,
    risk_score: 0.78,
    credibility: 'High',
    source: 'Toronto General Hospital',
    timestamp: '2025-08-02T14:23:00Z',
    explanation: 'Increased ER visits with pneumonia-like symptoms in downtown core.',
    status: 'active'
  },
  {
    id: 'alert-2',
    disease: 'Influenza',
    location: 'North York, Toronto, ON',
    lat: 43.7615,
    lng: -79.4111,
    risk_score: 0.65,
    credibility: 'Medium',
    source: 'North York General Hospital',
    timestamp: '2025-08-02T12:15:00Z',
    explanation: 'Rising flu cases reported in North York area schools.',
    status: 'monitoring'
  },
  {
    id: 'alert-3',
    disease: 'COVID-19',
    location: 'Scarborough, Toronto, ON',
    lat: 43.7764,
    lng: -79.2318,
    risk_score: 0.45,
    credibility: 'High',
    source: 'Scarborough Health Network',
    timestamp: '2025-08-02T10:30:00Z',
    explanation: 'New COVID-19 variant detected in Scarborough community.',
    status: 'active'
  },
  {
    id: 'alert-4',
    disease: 'Gastroenteritis',
    location: 'Etobicoke, Toronto, ON',
    lat: 43.6205,
    lng: -79.5132,
    risk_score: 0.32,
    credibility: 'Low',
    source: 'Etobicoke General Hospital',
    timestamp: '2025-08-02T09:45:00Z',
    explanation: 'Foodborne illness cluster reported in Etobicoke restaurants.',
    status: 'resolved'
  }
]

export async function GET() {
  return NextResponse.json({ alerts: torontoAlerts })
}

export async function POST(request: Request) {
  const body = await request.json()
  
  if (body.feedback_type) {
    // Handle feedback
    console.log(`Feedback received for ${body.alert_id}: ${body.feedback_type}`)
    return NextResponse.json({ success: true })
  }
  
  if (body.alert_id) {
    // Handle send alert
    console.log(`Sending alert to responders: ${body.alert_id}`)
    return NextResponse.json({ success: true })
  }
  
  return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
} 