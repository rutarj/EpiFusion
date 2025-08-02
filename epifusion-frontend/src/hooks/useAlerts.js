import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all alerts
  const fetchAlerts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getAlerts();
      setAlerts(response.alerts || response);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch alerts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Submit feedback for an alert
  const submitFeedback = async (alertId, feedbackType) => {
    try {
      await api.submitFeedback(alertId, feedbackType);
      
      // Update local state to reflect feedback
      setAlerts(prevAlerts => 
        prevAlerts.map(alert => 
          alert.id === alertId 
            ? { 
                ...alert, 
                credibility: feedbackType === 'approve' 
                  ? (alert.credibility === 'Low' ? 'Medium' : 'High')
                  : (alert.credibility === 'High' ? 'Medium' : 'Low')
              }
            : alert
        )
      );
      
      return { success: true };
    } catch (err) {
      console.error('Failed to submit feedback:', err);
      return { success: false, error: err.message };
    }
  };

  // Send alert to responders
  const sendAlert = async (alertId) => {
    try {
      const response = await api.sendAlert(alertId);
      return response;
    } catch (err) {
      console.error('Failed to send alert:', err);
      return { success: false, error: err.message };
    }
  };

  // Analyze text and create new alert
  const analyzeText = async (text) => {
    try {
      setLoading(true);
      const response = await api.analyzeText(text);
      const newAlert = response.alert;
      
      // Add new alert to the list
      setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
      
      return { success: true, alert: newAlert };
    } catch (err) {
      console.error('Failed to analyze text:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Load alerts on mount
  useEffect(() => {
    fetchAlerts();
  }, []);

  return {
    alerts,
    loading,
    error,
    fetchAlerts,
    submitFeedback,
    sendAlert,
    analyzeText,
  };
}; 