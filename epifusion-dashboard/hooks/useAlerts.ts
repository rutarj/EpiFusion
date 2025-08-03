import { useState, useEffect } from 'react'

export interface Alert {
  id: string
  disease: string
  location: string
  lat: number
  lng: number
  risk_score: number
  credibility: 'High' | 'Medium' | 'Low'
  source: string
  timestamp: string
  explanation: string
  status: 'active' | 'monitoring' | 'resolved' | 'pending'
}

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAlerts = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:5050/api/alerts')
      if (!response.ok) {
        throw new Error('Failed to fetch alerts')
      }
      const data = await response.json()
      setAlerts(data.alerts)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch alerts')
    } finally {
      setLoading(false)
    }
  }

  const sendFeedback = async (alertId: string, feedbackType: 'approve' | 'flag') => {
    try {
      const response = await fetch('http://localhost:5050/api/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alert_id: alertId,
          feedback_type: feedbackType,
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to send feedback')
      }
      
      return true
    } catch (err) {
      console.error('Feedback error:', err)
      return false
    }
  }

  const sendAlert = async (alertId: string) => {
    try {
      const response = await fetch('http://localhost:5050/api/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alert_id: alertId,
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to send alert')
      }
      
      return true
    } catch (err) {
      console.error('Send alert error:', err)
      return false
    }
  }

  const analyzeText = async (text: string): Promise<Alert | null> => {
    try {
      const response = await fetch('http://localhost:5050/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })
      
      if (!response.ok) {
        throw new Error('Analysis failed')
      }
      
      const data = await response.json()
      return data.alert
    } catch (err) {
      console.error('Analysis error:', err)
      return null
    }
  }

  useEffect(() => {
    fetchAlerts()
  }, [])

  return {
    alerts,
    loading,
    error,
    fetchAlerts,
    sendFeedback,
    sendAlert,
    analyzeText,
  }
} 