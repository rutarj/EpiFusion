"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Clock, MapPin, Search, CheckCircle, Flag, Send, Loader2 } from "lucide-react"
import { useAlerts, type Alert } from "@/hooks/useAlerts"

const severityColors = {
  high: "bg-red-100 text-red-800 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-800",
  medium:
    "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950/20 dark:text-yellow-400 dark:border-yellow-800",
  low: "bg-green-100 text-green-800 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800",
}

const statusColors = {
  active: "bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400",
  monitoring: "bg-yellow-50 text-yellow-700 dark:bg-yellow-950/20 dark:text-yellow-400",
  resolved: "bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400",
  pending: "bg-gray-50 text-gray-700 dark:bg-gray-950/20 dark:text-gray-400",
}

// Helper function to get severity from risk score
const getSeverityFromRiskScore = (riskScore: number) => {
  if (riskScore >= 0.7) return 'high'
  if (riskScore >= 0.4) return 'medium'
  return 'low'
}

// Helper function to format time ago
const formatTimeAgo = (timestamp: string) => {
  const now = new Date()
  const alertTime = new Date(timestamp)
  const diffInMinutes = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hour${Math.floor(diffInMinutes / 60) === 1 ? '' : 's'} ago`
  return `${Math.floor(diffInMinutes / 1440)} day${Math.floor(diffInMinutes / 1440) === 1 ? '' : 's'} ago`
}

interface AlertFeedProps {
  onAlertSelect: (alert: any) => void
  onNotification: (notification: any) => void
}

export function AlertFeed({ onAlertSelect, onNotification }: AlertFeedProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const { alerts, loading, error, sendFeedback, sendAlert } = useAlerts()

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = severityFilter === "all" || getSeverityFromRiskScore(alert.risk_score) === severityFilter
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter

    return matchesSearch && matchesSeverity && matchesStatus
  })

  const handleQuickAction = async (action: string, alert: Alert) => {
    let success = false
    
    if (action === "Approved") {
      success = await sendFeedback(alert.id, "approve")
    } else if (action === "Flagged") {
      success = await sendFeedback(alert.id, "flag")
    } else if (action === "Sent") {
      success = await sendAlert(alert.id)
    }
    
    onNotification({
      type: success ? "success" : "error",
      title: `Alert ${action}`,
      message: success 
        ? `Alert "${alert.disease}" has been ${action.toLowerCase()}.`
        : `Failed to ${action.toLowerCase()} alert.`,
    })
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          Active Alerts
          <Badge variant="destructive" className="ml-auto">
            {filteredAlerts.length}
          </Badge>
        </CardTitle>

        {/* Search and Filters */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>

          <div className="flex gap-2">
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="contained">Contained</SelectItem>
                <SelectItem value="monitoring">Monitoring</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[500px]">
          <div className="space-y-2 p-4 pt-0">
            {loading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Loading alerts...</span>
              </div>
            )}
            
            {error && (
              <div className="text-center py-8 text-red-500">
                <AlertTriangle className="h-6 w-6 mx-auto mb-2" />
                <p>Failed to load alerts: {error}</p>
              </div>
            )}
            
            {!loading && !error && filteredAlerts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <AlertTriangle className="h-6 w-6 mx-auto mb-2" />
                <p>No alerts found</p>
              </div>
            )}
            
            {!loading && !error && filteredAlerts.map((alert) => (
              <Card
                key={alert.id}
                className="cursor-pointer transition-all hover:shadow-md border-l-4 border-l-red-500"
                onClick={() => onAlertSelect(alert)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm leading-tight">{alert.disease} Outbreak</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {alert.location}
                          <Clock className="h-3 w-3 ml-1" />
                          {formatTimeAgo(alert.timestamp)}
                        </div>
                      </div>
                      <Badge className={severityColors[getSeverityFromRiskScore(alert.risk_score) as keyof typeof severityColors]}>
                        {getSeverityFromRiskScore(alert.risk_score).toUpperCase()}
                      </Badge>
                    </div>

                    {/* Metrics */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">Risk: {(alert.risk_score * 100).toFixed(0)}%</span>
                      <Badge variant="outline" className={statusColors[alert.status as keyof typeof statusColors]}>
                        {alert.status}
                      </Badge>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-1 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 h-7 text-xs bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleQuickAction("Approved", alert)
                        }}
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 h-7 text-xs bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleQuickAction("Flagged", alert)
                        }}
                      >
                        <Flag className="h-3 w-3 mr-1" />
                        Flag
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 h-7 text-xs bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleQuickAction("Sent", alert)
                        }}
                      >
                        <Send className="h-3 w-3 mr-1" />
                        Send
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
