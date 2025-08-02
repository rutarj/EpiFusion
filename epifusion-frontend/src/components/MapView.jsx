import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getRiskColor } from '../utils/mockData';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = ({ alerts, onAlertSelect, selectedAlertId }) => {
  const mapRef = useRef(null);

  // Custom marker colors based on risk
  const createCustomIcon = (riskScore) => {
    const color = getRiskColor(riskScore);
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        background-color: ${color === 'red' ? '#ef4444' : color === 'yellow' ? '#f59e0b' : '#10b981'};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 10px;
      ">${Math.round(riskScore * 100)}</div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  useEffect(() => {
    if (mapRef.current && alerts.length > 0) {
      const bounds = L.latLngBounds(
        alerts.map(alert => [alert.lat, alert.lng])
      );
      mapRef.current.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [alerts]);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Outbreak Map
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {alerts.length} active alerts worldwide
        </p>
      </div>
      
      <div className="h-[60vh] md:h-[500px]">
      <MapContainer
          center={[43.6532, -79.3832]} // Toronto as default center
          zoom={11}
          className="h-full w-full"
          ref={mapRef}
          maxBounds={[
            [43.5, -79.7], // Southwest corner
            [43.9, -79.2]  // Northeast corner
          ]}
          maxBoundsViscosity={1.0} // Prevents panning outside
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {alerts.map((alert) => (
            <Marker
              key={alert.id}
              position={[alert.lat, alert.lng]}
              icon={createCustomIcon(alert.risk_score)}
              eventHandlers={{
                click: () => onAlertSelect(alert),
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {alert.disease}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    📍 {alert.location}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    Risk: {Math.round(alert.risk_score * 100)}%
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatTimestamp(alert.timestamp)}
                  </p>
                  <button
                    onClick={() => onAlertSelect(alert)}
                    className="mt-2 w-full btn-primary text-xs py-1"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView; 