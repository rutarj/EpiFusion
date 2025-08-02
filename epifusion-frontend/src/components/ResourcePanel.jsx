import React from 'react';
import { useResources } from '../hooks/useResources';

const ResourcePanel = ({ alertId }) => {
  const { resources, loading, error, getResourceStatus } = useResources(alertId);

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="text-red-600 text-center">
          Error loading resources: {error}
        </div>
      </div>
    );
  }

  if (!resources) {
    return (
      <div className="card">
        <div className="text-gray-500 text-center py-8">
          Select an alert to view resource data
        </div>
      </div>
    );
  }

  const status = getResourceStatus(resources);

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'good': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'critical': return 'Critical';
      case 'warning': return 'Warning';
      case 'good': return 'Good';
      default: return 'Unknown';
    }
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Resource Demand
      </h3>

      <div className="space-y-6">
        {/* Hospital Beds */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Hospital Beds
            </span>
            <span className="text-sm text-gray-500">
              {resources.beds_needed} / {resources.beds_capacity}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getStatusColor(status.bedStatus)}`}
              style={{ width: `${Math.min(status.bedUsage, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500">
              {Math.round(status.bedUsage)}% capacity
            </span>
            <span className={`text-xs font-medium ${
              status.bedStatus === 'critical' ? 'text-red-600' :
              status.bedStatus === 'warning' ? 'text-yellow-600' :
              'text-green-600'
            }`}>
              {getStatusText(status.bedStatus)}
            </span>
          </div>
        </div>

        {/* Medical Staff */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Medical Staff
            </span>
            <span className="text-sm text-gray-500">
              {resources.staff_needed} / {resources.staff_capacity}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getStatusColor(status.staffStatus)}`}
              style={{ width: `${Math.min(status.staffUsage, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500">
              {Math.round(status.staffUsage)}% capacity
            </span>
            <span className={`text-xs font-medium ${
              status.staffStatus === 'critical' ? 'text-red-600' :
              status.staffStatus === 'warning' ? 'text-yellow-600' :
              'text-green-600'
            }`}>
              {getStatusText(status.staffStatus)}
            </span>
          </div>
        </div>

        {/* Vaccine Stock */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Vaccine Stock
            </span>
            <span className="text-sm text-gray-500">
              {resources.vaccine_stock} / {resources.vaccine_threshold}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getStatusColor(status.vaccineStatus)}`}
              style={{ width: `${Math.min(status.vaccineStatus, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500">
              {Math.round(status.vaccineStatus)}% of threshold
            </span>
            <span className={`text-xs font-medium ${
              status.vaccineStatus === 'critical' ? 'text-red-600' :
              status.vaccineStatus === 'warning' ? 'text-yellow-600' :
              'text-green-600'
            }`}>
              {getStatusText(status.vaccineStatus)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Summary:</strong> Based on current alert, projected bed usage: {Math.round(status.bedUsage)}%
          {status.bedStatus === 'critical' && ' - Immediate action required'}
          {status.staffStatus === 'critical' && ' - Staff shortage critical'}
          {status.vaccineStatus === 'critical' && ' - Vaccine stock critical'}
        </p>
      </div>
    </div>
  );
};

export default ResourcePanel; 