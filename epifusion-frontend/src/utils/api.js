// API utility for EpiFusion AI Dashboard

// const BASE_URL = '/api'; // Change this to your actual API base URL
const BASE_URL = 'http://localhost:5050/api'; // or your deployed server
// Centralized fetch wrapper with error handling
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// API functions for different endpoints
export const api = {
  // Get all alerts
  getAlerts: () => apiCall('/alerts'),
  
  // Analyze raw text and return structured alert
  analyzeText: (text) => apiCall('/analyze', {
    method: 'POST',
    body: JSON.stringify({ text }),
  }),
  
  // Get forecast data for specific alert
  getForecast: (alertId) => apiCall(`/forecast?alert_id=${alertId}`),
  
  // Get resource optimization data for specific alert
  getResources: (alertId) => apiCall(`/resources?alert_id=${alertId}`),
  
  // Submit feedback for an alert
  submitFeedback: (alertId, feedbackType) => apiCall('/feedback', {
    method: 'POST',
    body: JSON.stringify({ alert_id: alertId, feedback_type: feedbackType }),
  }),
  
  // Send alert to responders
  sendAlert: (alertId) => apiCall('/send-alert', {
    method: 'POST',
    body: JSON.stringify({ alert_id: alertId }),
  }),
};

// Mock API functions for development (using mock data)
export const mockApi = {
  getAlerts: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { alerts: await import('./mockData.js').then(m => m.mockAlerts) };
  },
  
  analyzeText: async (text) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      alert: {
        id: `alert-${Date.now()}`,
        disease: "Analyzed Disease",
        location: "Analyzed Location",
        lat: 43.6532,
        lng: -79.3832,
        risk_score: 0.5,
        credibility: "Medium",
        source: "AI Analysis",
        timestamp: new Date().toISOString(),
        explanation: text,
      }
    };
  },
  
  getForecast: async (alertId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const { mockForecasts } = await import('./mockData.js');
    return mockForecasts[alertId] || null;
  },
  
  getResources: async (alertId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const { mockResources } = await import('./mockData.js');
    return mockResources[alertId] || null;
  },
  
  submitFeedback: async (alertId, feedbackType) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return { success: true, message: `Feedback ${feedbackType} submitted for alert ${alertId}` };
  },
  
  sendAlert: async (alertId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: `Alert ${alertId} sent to responders` };
  },
};

// Export the appropriate API based on environment
// export default process.env.NODE_ENV === 'production' ? api : mockApi; 

export default api; // instead of mockApi
