// API configuration for connecting to epifusion-backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'

export const apiConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}

// Helper function for API calls
export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${apiConfig.baseURL}${endpoint}`
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...apiConfig.headers,
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API call failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// API endpoints
export const endpoints = {
  alerts: '/api/alerts',
  analyze: '/api/analyze',
} as const 