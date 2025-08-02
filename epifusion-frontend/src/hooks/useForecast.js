import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useForecast = (alertId) => {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchForecast = async (id) => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await api.getForecast(id);
      setForecast(data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch forecast:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (alertId) {
      fetchForecast(alertId);
    }
  }, [alertId]);

  const getR0Trend = (r0) => {
    if (r0 >= 1.5) return { trend: 'up', risk: 'high', message: `R₀ trending up: ${r0} → high spread risk` };
    if (r0 >= 1.2) return { trend: 'up', risk: 'medium', message: `R₀ trending up: ${r0} → moderate spread risk` };
    if (r0 >= 1.0) return { trend: 'stable', risk: 'medium', message: `R₀ stable: ${r0} → controlled spread` };
    return { trend: 'down', risk: 'low', message: `R₀ trending down: ${r0} → low spread risk` };
  };

  return {
    forecast,
    loading,
    error,
    fetchForecast,
    getR0Trend,
  };
}; 