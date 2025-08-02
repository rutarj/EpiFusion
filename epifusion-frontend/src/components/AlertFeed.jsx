import React from 'react';
import { useState } from 'react';
import AlertCard from './AlertCard';
import { useAlerts } from '../hooks/useAlerts';

const AlertFeed = ({ onAlertSelect, selectedAlertId }) => {
  const { alerts, loading, error, submitFeedback } = useAlerts();
  const [filter, setFilter] = useState('all');

  const handleApprove = async (alertId) => {
    await submitFeedback(alertId, 'approve');
  };

  const handleFlag = async (alertId) => {
    await submitFeedback(alertId, 'flag');
  };

  const handleViewDetails = (alert) => {
    onAlertSelect(alert);
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'high') return alert.risk_score >= 0.7;
    if (filter === 'medium') return alert.risk_score >= 0.4 && alert.risk_score < 0.7;
    if (filter === 'low') return alert.risk_score < 0.4;
    return true;
  });

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-red-600 text-center">
          Error loading alerts: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Active Alerts ({filteredAlerts.length})
        </h2>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs rounded-full ${
              filter === 'all' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('high')}
            className={`px-3 py-1 text-xs rounded-full ${
              filter === 'high' 
                ? 'bg-red-100 text-red-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            High Risk
          </button>
          <button
            onClick={() => setFilter('medium')}
            className={`px-3 py-1 text-xs rounded-full ${
              filter === 'medium' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Medium Risk
          </button>
          <button
            onClick={() => setFilter('low')}
            className={`px-3 py-1 text-xs rounded-full ${
              filter === 'low' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Low Risk
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No alerts found for the selected filter.
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onApprove={handleApprove}
              onFlag={handleFlag}
              onViewDetails={() => handleViewDetails(alert)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AlertFeed; 