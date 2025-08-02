"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Activity, TrendingUp, TrendingDown, Users, Shield } from "lucide-react"

const metrics = [
  {
    title: "Active Alerts",
    value: "12",
    change: "+3",
    changeType: "increase" as const,
    icon: AlertTriangle,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/20",
  },
  {
    title: "Risk Level",
    value: "Medium",
    change: "Stable",
    changeType: "stable" as const,
    icon: Shield,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
  },
  {
    title: "Monitored Cases",
    value: "1,247",
    change: "+89",
    changeType: "increase" as const,
    icon: Activity,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    title: "Resource Capacity",
    value: "85%",
    change: "-5%",
    changeType: "decrease" as const,
    icon: Users,
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/20",
  },
]

export function DashboardOverview() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Epidemic Monitoring Dashboard</h1>
          <p className="text-muted-foreground">Real-time monitoring and response coordination</p>
        </div>
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800"
        >
          System Online
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                {metric.changeType === "increase" && <TrendingUp className="h-3 w-3 text-green-500" />}
                {metric.changeType === "decrease" && <TrendingDown className="h-3 w-3 text-red-500" />}
                <span
                  className={
                    metric.changeType === "increase"
                      ? "text-green-600"
                      : metric.changeType === "decrease"
                        ? "text-red-600"
                        : "text-muted-foreground"
                  }
                >
                  {metric.change}
                </span>
                <span>from last hour</span>
              </div>
              {metric.title === "Resource Capacity" && <Progress value={85} className="mt-2 h-1" />}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
