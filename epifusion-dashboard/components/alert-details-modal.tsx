"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, MapPin, Clock, Users, Activity, FileText, Send, Flag, CheckCircle, X } from "lucide-react"
import { type Alert } from "@/hooks/useAlerts"

interface AlertDetailsModalProps {
  alert: Alert
  onClose: () => void
  onAction: (notification: any) => void
}

export function AlertDetailsModal({ alert, onClose, onAction }: AlertDetailsModalProps) {
  const [response, setResponse] = useState("")

  const handleAction = (action: string) => {
    onAction({
      type: "success",
      title: `Alert ${action}`,
      message: `Alert "${alert.disease}" has been ${action.toLowerCase()}.`,
    })
    onClose()
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

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-xl">{alert.disease} Outbreak</DialogTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {alert.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatTimeAgo(alert.timestamp)}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Risk: {(alert.risk_score * 100).toFixed(0)}%
                </div>
              </div>
            </div>
            <Badge
              className={
                getSeverityFromRiskScore(alert.risk_score) === "high"
                  ? "bg-red-100 text-red-800 border-red-200"
                  : getSeverityFromRiskScore(alert.risk_score) === "medium"
                    ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                    : "bg-green-100 text-green-800 border-green-200"
              }
            >
              {getSeverityFromRiskScore(alert.risk_score).toUpperCase()}
            </Badge>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="response">Response</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Alert Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Disease</label>
                    <p className="text-sm text-muted-foreground">{alert.disease}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Source</label>
                    <p className="text-sm text-muted-foreground">{alert.source}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Credibility</label>
                    <p className="text-sm text-muted-foreground">{alert.credibility}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Risk Score</label>
                    <p className="text-sm text-muted-foreground">{(alert.risk_score * 100).toFixed(0)}%</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Current Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <p className="text-sm text-muted-foreground capitalize">{alert.status}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <p className="text-sm text-muted-foreground">{alert.location}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Coordinates</label>
                    <p className="text-sm text-muted-foreground">{alert.lat.toFixed(4)}, {alert.lng.toFixed(4)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Timestamp</label>
                    <p className="text-sm text-muted-foreground">{new Date(alert.timestamp).toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {alert.explanation}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Event Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: "14:30", event: "Initial alert received from hospital surveillance", status: "completed" },
                    { time: "14:45", event: "Alert validated and classified as high priority", status: "completed" },
                    { time: "15:00", event: "Response team notified and mobilized", status: "completed" },
                    { time: "15:15", event: "Contact tracing initiated", status: "in-progress" },
                    { time: "15:30", event: "Public health advisory prepared", status: "pending" },
                    { time: "16:00", event: "Resource allocation assessment", status: "pending" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          item.status === "completed"
                            ? "bg-green-500"
                            : item.status === "in-progress"
                              ? "bg-yellow-500"
                              : "bg-gray-300"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.event}</span>
                          <span className="text-xs text-muted-foreground">{item.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="response" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Response Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Add Response Note</label>
                  <Textarea
                    placeholder="Enter response details, actions taken, or recommendations..."
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleAction("Updated")}>
                    <FileText className="h-4 w-4 mr-1" />
                    Save Note
                  </Button>
                  <Button size="sm" variant="outline">
                    <Send className="h-4 w-4 mr-1" />
                    Send Update
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Epidemiological Data</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Attack Rate:</span>
                    <span className="text-sm font-medium">12.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Incubation Period:</span>
                    <span className="text-sm font-medium">1-4 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Case Fatality Rate:</span>
                    <span className="text-sm font-medium">0.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">R0 Estimate:</span>
                    <span className="text-sm font-medium">2.1</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Demographics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Age Range:</span>
                    <span className="text-sm font-medium">18-65 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Gender Distribution:</span>
                    <span className="text-sm font-medium">60% Female</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Hospitalization Rate:</span>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">ICU Admissions:</span>
                    <span className="text-sm font-medium">3</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleAction("Flagged")}>
              <Flag className="h-4 w-4 mr-1" />
              Flag for Review
            </Button>
            <Button variant="outline" onClick={() => handleAction("Escalated")}>
              <AlertTriangle className="h-4 w-4 mr-1" />
              Escalate
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-1" />
              Close
            </Button>
            <Button onClick={() => handleAction("Approved")}>
              <CheckCircle className="h-4 w-4 mr-1" />
              Approve Response
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
