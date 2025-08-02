"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, BarChart3, LineChart, Download, RefreshCw } from "lucide-react"

interface ForecastChartProps {
  title: string
  type: "line" | "bar"
  data: "forecast" | "resources"
}

const forecastData = [
  { period: "Week 1", predicted: 45, actual: 42, confidence: 85 },
  { period: "Week 2", predicted: 52, actual: 48, confidence: 82 },
  { period: "Week 3", predicted: 38, actual: 41, confidence: 88 },
  { period: "Week 4", predicted: 65, actual: null, confidence: 79 },
  { period: "Week 5", predicted: 72, actual: null, confidence: 75 },
  { period: "Week 6", predicted: 58, actual: null, confidence: 71 },
]

const resourceData = [
  { category: "ICU Beds", current: 85, capacity: 100, trend: "stable" },
  { category: "Ventilators", current: 42, capacity: 60, trend: "increasing" },
  { category: "Staff", current: 78, capacity: 90, trend: "decreasing" },
  { category: "PPE", current: 92, capacity: 100, trend: "stable" },
  { category: "Medications", current: 67, capacity: 80, trend: "increasing" },
]

export function ForecastChart({ title, type, data }: ForecastChartProps) {
  const isResourceChart = data === "resources"
  const chartData = isResourceChart ? resourceData : forecastData

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {type === "line" ? (
              <LineChart className="h-5 w-5 text-blue-500" />
            ) : (
              <BarChart3 className="h-5 w-5 text-green-500" />
            )}
            {title}
          </CardTitle>

          <div className="flex items-center gap-2">
            <Select defaultValue="7d">
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">24H</SelectItem>
                <SelectItem value="7d">7D</SelectItem>
                <SelectItem value="30d">30D</SelectItem>
                <SelectItem value="90d">90D</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Chart Container */}
        <div className="h-64 mb-4">
          {isResourceChart ? (
            // Resource Utilization Chart
            <div className="space-y-4">
              {resourceData.map((resource, index) => (
                <div key={resource.category} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{resource.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        {resource.current}/{resource.capacity}
                      </span>
                      {resource.trend === "increasing" && <TrendingUp className="h-3 w-3 text-green-500" />}
                      {resource.trend === "decreasing" && <TrendingDown className="h-3 w-3 text-red-500" />}
                      {resource.trend === "stable" && <div className="h-3 w-3 rounded-full bg-gray-400" />}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        (resource.current / resource.capacity) > 0.8
                          ? "bg-red-500"
                          : resource.current / resource.capacity > 0.6
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                      style={{ width: `${(resource.current / resource.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Forecast Line Chart (Simulated)
            <div className="relative h-full bg-gradient-to-t from-blue-50/50 to-transparent dark:from-blue-950/20 rounded-lg p-4">
              <div className="absolute inset-4">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
                  <span>80</span>
                  <span>60</span>
                  <span>40</span>
                  <span>20</span>
                  <span>0</span>
                </div>

                {/* Chart area */}
                <div className="ml-8 h-full relative">
                  {/* Grid lines */}
                  <div className="absolute inset-0 grid grid-rows-4 grid-cols-5 opacity-20">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className="border border-gray-300 dark:border-gray-600" />
                    ))}
                  </div>

                  {/* Simulated line chart */}
                  <svg className="absolute inset-0 w-full h-full">
                    <polyline
                      fill="none"
                      stroke="rgb(59 130 246)"
                      strokeWidth="2"
                      points="0,120 80,100 160,140 240,80 320,60 400,90"
                      className="drop-shadow-sm"
                    />
                    <polyline
                      fill="none"
                      stroke="rgb(34 197 94)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      points="240,85 320,65 400,95"
                      className="opacity-70"
                    />
                  </svg>

                  {/* Data points */}
                  {forecastData.slice(0, 3).map((point, index) => (
                    <div
                      key={index}
                      className="absolute w-2 h-2 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${index * 20 + 10}%`,
                        top: `${100 - (point.actual || point.predicted)}%`,
                      }}
                    />
                  ))}
                </div>

                {/* X-axis labels */}
                <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-muted-foreground">
                  {forecastData.map((point) => (
                    <span key={point.period}>{point.period}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chart Statistics */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          {isResourceChart ? (
            <>
              <div className="text-center">
                <div className="text-lg font-bold text-green-500">85%</div>
                <div className="text-xs text-muted-foreground">Avg Utilization</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-500">3</div>
                <div className="text-xs text-muted-foreground">Critical Resources</div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-500">72</div>
                <div className="text-xs text-muted-foreground">Peak Forecast</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-500">79%</div>
                <div className="text-xs text-muted-foreground">Confidence</div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
