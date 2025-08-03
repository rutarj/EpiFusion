"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Map, Layers, ZoomIn, ZoomOut, RotateCcw, MapPin, Loader2 } from "lucide-react"
import { useAlerts, type Alert } from "@/hooks/useAlerts"

// Toronto coordinates for map centering
const TORONTO_CENTER = { lat: 43.6532, lng: -79.3832 }

interface MapViewProps {
  onAlertSelect: (alert: any) => void
}

export function MapView({ onAlertSelect }: MapViewProps) {
  const [mapType, setMapType] = useState("satellite")
  const [timeFilter, setTimeFilter] = useState("24h")
  const [showHeatmap, setShowHeatmap] = useState(false)
  const { alerts, loading } = useAlerts()

  // Helper function to get severity from risk score
  const getSeverityFromRiskScore = (riskScore: number) => {
    if (riskScore >= 0.7) return 'high'
    if (riskScore >= 0.4) return 'medium'
    return 'low'
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5 text-blue-500" />
            Interactive Map
          </CardTitle>

          <div className="flex items-center gap-2">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">1H</SelectItem>
                <SelectItem value="24h">24H</SelectItem>
                <SelectItem value="7d">7D</SelectItem>
                <SelectItem value="30d">30D</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant={showHeatmap ? "default" : "outline"}
              size="sm"
              onClick={() => setShowHeatmap(!showHeatmap)}
            >
              <Layers className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Map Container */}
        <div className="relative h-[500px] bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-lg mx-4 mb-4 overflow-hidden">
          {/* OpenStreetMap Background for Toronto */}
          <div className="absolute inset-0">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=-79.5,43.6,-79.2,43.8&layer=mapnik&marker=43.6532,-79.3832"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur rounded-lg p-3 border">
            <h4 className="text-sm font-medium mb-2">Alert Severity</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span>High Risk</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span>Medium Risk</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span>Low Risk</span>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur">
              <div className="flex items-center gap-2">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>Loading Toronto alerts...</span>
              </div>
            </div>
          )}

          {/* Toronto Alert Markers */}
          {!loading && alerts.map((alert) => {
            const severity = getSeverityFromRiskScore(alert.risk_score)
            
            // Convert lat/lng to map position (simplified positioning)
            const mapWidth = 800
            const mapHeight = 500
            const latRange = 0.2 // Toronto area
            const lngRange = 0.3
            
            const left = ((alert.lng - (TORONTO_CENTER.lng - lngRange/2)) / lngRange) * 100
            const top = ((TORONTO_CENTER.lat - alert.lat) / latRange) * 100
            
            return (
              <div
                key={alert.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 z-10"
                style={{
                  left: `${Math.max(5, Math.min(95, left))}%`,
                  top: `${Math.max(5, Math.min(95, top))}%`,
                }}
                onClick={() => onAlertSelect(alert)}
              >
                <div
                  className={`relative p-2 rounded-full ${
                    severity === "high"
                      ? "bg-red-500"
                      : severity === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  } text-white shadow-lg`}
                >
                  <MapPin className="h-4 w-4" />

                  {/* Pulse Animation for High Severity */}
                  {severity === "high" && (
                    <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
                  )}

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-background border rounded text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity z-20">
                    <div className="font-medium">{alert.disease}</div>
                    <div className="text-muted-foreground">{alert.location}</div>
                    <div className="text-muted-foreground">Risk: {(alert.risk_score * 100).toFixed(0)}%</div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Heatmap Overlay */}
          {showHeatmap && (
            <div className="absolute inset-0 bg-gradient-radial from-red-500/20 via-yellow-500/10 to-transparent opacity-60" />
          )}
        </div>

        {/* Map Statistics */}
        <div className="px-4 pb-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-red-500">
                {alerts.filter(a => getSeverityFromRiskScore(a.risk_score) === 'high').length}
              </div>
              <div className="text-xs text-muted-foreground">High Risk Alerts</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-500">
                {alerts.filter(a => a.status === 'active').length}
              </div>
              <div className="text-xs text-muted-foreground">Active Alerts</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-green-500">
                {alerts.length}
              </div>
              <div className="text-xs text-muted-foreground">Total Alerts</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
