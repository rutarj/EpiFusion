import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useResources = (alertId) => {
  const [resources, setResources] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchResources = async (id) => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await api.getResources(id);
      setResources(data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch resources:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (alertId) {
      fetchResources(alertId);
    }
  }, [alertId]);

  const getResourceStatus = (resources) => {
    if (!resources) return null;

    const bedUsage = (resources.beds_needed / resources.beds_capacity) * 100;
    const staffUsage = (resources.staff_needed / resources.staff_capacity) * 100;
    const vaccineStatus = (resources.vaccine_stock / resources.vaccine_threshold) * 100;

    return {
      bedUsage,
      staffUsage,
      vaccineStatus,
      bedStatus: bedUsage >= 80 ? 'critical' : bedUsage >= 60 ? 'warning' : 'good',
      staffStatus: staffUsage >= 80 ? 'critical' : staffUsage >= 60 ? 'warning' : 'good',
      vaccineStatus: vaccineStatus <= 30 ? 'critical' : vaccineStatus <= 50 ? 'warning' : 'good',
    };
  };

  return {
    resources,
    loading,
    error,
    fetchResources,
    getResourceStatus,
  };
}; 