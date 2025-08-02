import { getRiskLevel, getRiskColor } from '../utils/mockData';

const AlertCard = ({ alert, onApprove, onFlag, onViewDetails }) => {
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
    <div className="card hover:shadow-lg transition-shadow cursor-pointer" onClick={onViewDetails}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {alert.disease}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            📍 {alert.location}
          </p>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <span className={`risk-badge risk-${riskLevel}`}>
            Risk: {Math.round(alert.risk_score * 100)}%
          </span>
          <span className={`text-xs font-medium ${getCredibilityColor(alert.credibility)}`}>
            Credibility: {alert.credibility}
          </span>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-sm text-gray-700 line-clamp-2">
          {alert.explanation}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-500">
          {formatTimestamp(alert.timestamp)}
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onApprove(alert.id);
            }}
            className="btn-primary text-xs py-1 px-3"
          >
            Approve
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFlag(alert.id);
            }}
            className="btn-danger text-xs py-1 px-3"
          >
            Flag
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertCard; 