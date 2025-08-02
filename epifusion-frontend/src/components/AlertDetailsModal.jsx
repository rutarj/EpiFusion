import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { getRiskLevel, getRiskColor } from '../utils/mockData';

const AlertDetailsModal = ({ alert, isOpen, onClose, onApprove, onFlag, onSendAlert }) => {
  if (!isOpen || !alert) return null;

  const riskLevel = getRiskLevel(alert.risk_score);
  const riskColor = getRiskColor(alert.risk_score);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getCredibilityColor = (credibility) => {
    switch (credibility.toLowerCase()) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {alert.disease}
                </h3>
                <p className="text-lg text-gray-600 mb-3">
                  📍 {alert.location}
                </p>
              </div>
              <button
                onClick={onClose}
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <span className="text-sm font-medium text-gray-500">Risk Score</span>
                <div className="mt-1">
                  <span className={`risk-badge risk-${riskLevel}`}>
                    {Math.round(alert.risk_score * 100)}%
                  </span>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Credibility</span>
                <div className="mt-1">
                  <span className={`text-sm font-medium ${getCredibilityColor(alert.credibility)}`}>
                    {alert.credibility}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Source</span>
                <div className="mt-1">
                  <span className="text-sm text-gray-900">{alert.source}</span>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Timestamp</span>
                <div className="mt-1">
                  <span className="text-sm text-gray-900">{formatTimestamp(alert.timestamp)}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-sm font-medium text-gray-500">AI Analysis</span>
              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">{alert.explanation}</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  onApprove(alert.id);
                  onClose();
                }}
                className="btn-primary flex-1"
              >
                Approve Alert
              </button>
              <button
                onClick={() => {
                  onFlag(alert.id);
                  onClose();
                }}
                className="btn-danger flex-1"
              >
                Flag False Positive
              </button>
              <button
                onClick={() => {
                  onSendAlert(alert.id);
                  onClose();
                }}
                className="btn-secondary flex-1"
              >
                Send Alert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertDetailsModal; 