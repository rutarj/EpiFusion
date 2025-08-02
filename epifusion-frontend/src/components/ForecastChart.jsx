import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useForecast } from '../hooks/useForecast';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ForecastChart = ({ alertId }) => {
  const { forecast, loading, error, getR0Trend } = useForecast(alertId);

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="text-red-600 text-center">
          Error loading forecast: {error}
        </div>
      </div>
    );
  }

  if (!forecast) {
    return (
      <div className="card">
        <div className="text-gray-500 text-center py-8">
          Select an alert to view forecast data
        </div>
      </div>
    );
  }

  const r0Trend = getR0Trend(forecast.r0);
  const days = ['Today', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];

  const chartData = {
    labels: days,
    datasets: [
      {
        label: 'Predicted Cases',
        data: forecast.daily_cases,
        borderColor: r0Trend.risk === 'high' ? '#ef4444' : r0Trend.risk === 'medium' ? '#f59e0b' : '#10b981',
        backgroundColor: r0Trend.risk === 'high' ? '#fef2f2' : r0Trend.risk === 'medium' ? '#fffbeb' : '#f0fdf4',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cases',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Days',
        },
      },
    },
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      default: return '→';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          7-Day Forecast
        </h3>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getTrendIcon(r0Trend.trend)}</span>
            <div>
              <p className={`text-sm font-medium ${getRiskColor(r0Trend.risk)}`}>
                R₀ = {forecast.r0}
              </p>
              <p className="text-xs text-gray-600">
                {r0Trend.message}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-64">
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p>Based on current transmission patterns and historical data</p>
      </div>
    </div>
  );
};

export default ForecastChart; 