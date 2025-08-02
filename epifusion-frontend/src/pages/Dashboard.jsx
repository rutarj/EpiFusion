import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import AlertFeed from '../components/AlertFeed';
import MapView from '../components/MapView';
import ForecastChart from '../components/ForecastChart';
import ResourcePanel from '../components/ResourcePanel';
import AlertDetailsModal from '../components/AlertDetailsModal';
import NotificationToast from '../components/NotificationToast';
import { useAlerts } from '../hooks/useAlerts';
import UploadDocCard from '../components/UploadDocCard';

const Dashboard = () => {
  const { alerts, sendAlert } = useAlerts();
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: 'success', isVisible: false });

  /*────────── alert handlers ──────────*/
  const handleAlertSelect = (alert) => {
    setSelectedAlert(alert);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAlert(null);
  };

  const handleApprove = async () => showNotification('Alert approved successfully');
  const handleFlag    = async () => showNotification('Alert flagged as false positive');

  const handleSendAlert = async (alertId) => {
    try {
      const result = await sendAlert(alertId);
      result.success
        ? showNotification('Alert sent to responders')
        : showNotification('Failed to send alert', 'error');
    } catch {
      showNotification('Failed to send alert', 'error');
    }
  };

  const handleFileUpload = async (file) => {
  const form = new FormData();
  form.append('file', file);
  form.append('region', 'toronto');  // or dynamic region

  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: form,
    });
    const data = await res.json();

    data.success
      ? showNotification(`Uploaded "${file.name}"`, 'success')
      : showNotification(`Upload failed: ${data.message}`, 'error');
  } catch (err) {
    console.error(err);
    showNotification('Network error', 'error');
  }
};


  /*────────── notification helpers ──────────*/
  const showNotification = (message, type = 'success') =>
    setNotification({ message, type, isVisible: true });

  const hideNotification = () =>
    setNotification((prev) => ({ ...prev, isVisible: false }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
          {/* Alert Feed Sidebar */}
          <div className="lg:col-span-1">
            <AlertFeed
              onAlertSelect={handleAlertSelect}
              selectedAlertId={selectedAlert?.id}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6 overflow-y-auto">
            {/* NEW: Upload card (companies / orgs only) */}
            <UploadDocCard onFileUpload={handleFileUpload} />

            {/* Map View */}
            <div className="h-1/2">
              <MapView
                alerts={alerts}
                onAlertSelect={handleAlertSelect}
                selectedAlertId={selectedAlert?.id}
              />
            </div>

            {/* Forecast and Resources */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-1/2">
              <ForecastChart alertId={selectedAlert?.id} />
              <ResourcePanel alertId={selectedAlert?.id} />
            </div>
          </div>
        </div>
      </div>

      {/* Alert Details Modal */}
      <AlertDetailsModal
        alert={selectedAlert}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApprove={handleApprove}
        onFlag={handleFlag}
        onSendAlert={handleSendAlert}
      />

      {/* Notification Toast */}
      <NotificationToast
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </div>
  );
};

export default Dashboard;
