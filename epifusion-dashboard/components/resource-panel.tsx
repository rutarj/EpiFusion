"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Users, Bed, Activity, Package, AlertCircle, CheckCircle, Clock, TrendingUp, TrendingDown, Search, Loader2 } from "lucide-react"
import { useAlerts } from "@/hooks/useAlerts"

const resources = [
  {
    id: 1,
    name: "ICU Beds",
    current: 85,
    total: 100,
    status: "critical",
    trend: "stable",
    icon: Bed,
    location: "Regional Medical Center",
    lastUpdated: "2 min ago",
  },
  {
    id: 2,
    name: "Ventilators",
    current: 42,
    total: 60,
    status: "warning",
    trend: "increasing",
    icon: Activity,
    location: "City Hospital",
    lastUpdated: "5 min ago",
  },
  {
    id: 3,
    name: "Medical Staff",
    current: 78,
    total: 90,
    status: "good",
    trend: "decreasing",
    icon: Users,
    location: "Healthcare Network",
    lastUpdated: "1 min ago",
  },
  {
    id: 4,
    name: "PPE Supplies",
    current: 920,
    total: 1000,
    status: "good",
    trend: "stable",
    icon: Package,
    location: "Supply Warehouse",
    lastUpdated: "10 min ago",
  },
  {
    id: 5,
    name: "Emergency Kits",
    current: 45,
    total: 50,
    status: "warning",
    trend: "stable",
    icon: Package,
    location: "Emergency Services",
    lastUpdated: "15 min ago",
  },
]

const statusColors = {
  critical: "text-red-500 bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800",
  warning: "text-yellow-500 bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-800",
  good: "text-green-500 bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800",
}

interface ResourcePanelProps {
  onNotification: (notification: any) => void
}

export function ResourcePanel({ onNotification }: ResourcePanelProps) {
  const [analysisText, setAnalysisText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const { analyzeText } = useAlerts()

  const handleResourceAction = (action: string, resource: any) => {
    onNotification({
      type: "success",
      title: `Resource ${action}`,
      message: `${resource.name} has been ${action.toLowerCase()}.`,
    })
  }

  const handleAnalyzeText = async () => {
    if (!analysisText.trim()) return
    
    setIsAnalyzing(true)
    try {
      const alert = await analyzeText(analysisText)
      if (alert) {
        onNotification({
          type: "success",
          title: "Analysis Complete",
          message: `Detected ${alert.disease} outbreak in ${alert.location} with ${(alert.risk_score * 100).toFixed(0)}% risk.`,
        })
        setAnalysisText("")
      } else {
        onNotification({
          type: "error",
          title: "Analysis Failed",
          message: "Could not analyze the provided text. Please try again.",
        })
      }
    } catch (error) {
      onNotification({
        type: "error",
        title: "Analysis Error",
        message: "An error occurred during analysis.",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-green-500" />
          Resource Status
          <Badge variant="outline" className="ml-auto">
            Live
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[500px]">
          <div className="space-y-3 p-4 pt-0">
            {/* Text Analysis Section */}
            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                      <Search className="h-4 w-4 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">AI Text Analysis</h4>
                      <p className="text-xs text-muted-foreground">Analyze news or social media for Toronto outbreaks</p>
                    </div>
                  </div>
                  
                  <Textarea
                    placeholder="Paste news article, social media post, or any text about disease outbreaks in Toronto..."
                    value={analysisText}
                    onChange={(e) => setAnalysisText(e.target.value)}
                    className="min-h-[80px] text-sm"
                  />
                  
                  <Button 
                    onClick={handleAnalyzeText} 
                    disabled={!analysisText.trim() || isAnalyzing}
                    className="w-full"
                    size="sm"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Analyze Text
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
            {resources.map((resource) => {
              const percentage = (resource.current / resource.total) * 100
              const ResourceIcon = resource.icon

              return (
                <Card key={resource.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-2 rounded-lg ${
                              resource.status === "critical"
                                ? "bg-red-50 dark:bg-red-950/20"
                                : resource.status === "warning"
                                  ? "bg-yellow-50 dark:bg-yellow-950/20"
                                  : "bg-green-50 dark:bg-green-950/20"
                            }`}
                          >
                            <ResourceIcon
                              className={`h-4 w-4 ${
                                resource.status === "critical"
                                  ? "text-red-500"
                                  : resource.status === "warning"
                                    ? "text-yellow-500"
                                    : "text-green-500"
                              }`}
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{resource.name}</h4>
                            <p className="text-xs text-muted-foreground">{resource.location}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {resource.trend === "increasing" && <TrendingUp className="h-3 w-3 text-green-500" />}
                          {resource.trend === "decreasing" && <TrendingDown className="h-3 w-3 text-red-500" />}
                          <Badge className={statusColors[resource.status as keyof typeof statusColors]}>
                            {resource.status}
                          </Badge>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">
                            {resource.current} / {resource.total}
                          </span>
                          <span className="text-muted-foreground">{percentage.toFixed(0)}%</span>
                        </div>
                        <Progress
                          value={percentage}
                          className={`h-2 ${
                            resource.status === "critical"
                              ? "[&>div]:bg-red-500"
                              : resource.status === "warning"
                                ? "[&>div]:bg-yellow-500"
                                : "[&>div]:bg-green-500"
                          }`}
                        />
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {resource.lastUpdated}
                        </div>

                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 px-2 text-xs bg-transparent"
                            onClick={() => handleResourceAction("Requested", resource)}
                          >
                            Request
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 px-2 text-xs bg-transparent"
                            onClick={() => handleResourceAction("Allocated", resource)}
                          >
                            Allocate
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </ScrollArea>

        {/* Summary Footer */}
        <div className="border-t p-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1">
                <AlertCircle className="h-3 w-3 text-red-500" />
                <span className="text-xs font-medium">2</span>
              </div>
              <div className="text-xs text-muted-foreground">Critical</div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1">
                <Clock className="h-3 w-3 text-yellow-500" />
                <span className="text-xs font-medium">2</span>
              </div>
              <div className="text-xs text-muted-foreground">Warning</div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span className="text-xs font-medium">1</span>
              </div>
              <div className="text-xs text-muted-foreground">Good</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
