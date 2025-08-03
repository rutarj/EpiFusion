"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AlertFeed } from "@/components/alert-feed"
import { MapView } from "@/components/map-view"
import { ForecastChart } from "@/components/forecast-chart"
import { ResourcePanel } from "@/components/resource-panel"
import { DashboardOverview } from "@/components/dashboard-overview"
import { AlertDetailsModal } from "@/components/alert-details-modal"
import { NotificationToast } from "@/components/notification-toast"
//import { ConnectionStatus } from "@/components/connection-status"
import { type Alert } from "@/hooks/useAlerts"

export default function Dashboard() {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [notifications, setNotifications] = useState<any[]>([])
  //const [backendConnected, setBackendConnected] = useState<boolean | null>(null)

  const addNotification = (notification: any) => {
    const id = Date.now()
    setNotifications((prev) => [...prev, { ...notification, id }])
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, 5000)
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        {/* Connection Status */}
        {/* <div className="flex justify-end">
          <ConnectionStatus onStatusChange={setBackendConnected} />
        </div> */}
        
        {/* Dashboard Overview */}
        <DashboardOverview />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[600px]">
          {/* Alert Feed - Takes 1 column */}
          <div className="lg:col-span-1">
            <AlertFeed onAlertSelect={setSelectedAlert} onNotification={addNotification} />
          </div>

          {/* Map View - Takes 2 columns */}
          <div className="lg:col-span-2">
            <MapView onAlertSelect={setSelectedAlert} />
          </div>

          {/* Resource Panel - Takes 1 column */}
          <div className="lg:col-span-1">
            <ResourcePanel onNotification={addNotification} />
          </div>
        </div>

        {/* Forecast Charts - Full width */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <ForecastChart title="Outbreak Forecast" type="line" data="forecast" />
          <ForecastChart title="Resource Utilization" type="bar" data="resources" />
        </div>
      </div>

      {/* Modals and Notifications */}
      {selectedAlert && (
        <AlertDetailsModal alert={selectedAlert} onClose={() => setSelectedAlert(null)} onAction={addNotification} />
      )}

      <NotificationToast notifications={notifications} />
    </DashboardLayout>
  )
}
