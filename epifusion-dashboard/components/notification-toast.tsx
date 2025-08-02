"use client"
import { X, CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Notification {
  id: number
  type: "success" | "error" | "warning" | "info"
  title: string
  message: string
}

interface NotificationToastProps {
  notifications: Notification[]
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const colors = {
  success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-950/20 dark:border-green-800 dark:text-green-400",
  error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-950/20 dark:border-red-800 dark:text-red-400",
  warning:
    "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950/20 dark:border-yellow-800 dark:text-yellow-400",
  info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950/20 dark:border-blue-800 dark:text-blue-400",
}

export function NotificationToast({ notifications }: NotificationToastProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => {
        const Icon = icons[notification.type]

        return (
          <div
            key={notification.id}
            className={`
              max-w-sm p-4 rounded-lg border shadow-lg backdrop-blur-sm
              animate-in slide-in-from-right-full duration-300
              ${colors[notification.type]}
            `}
          >
            <div className="flex items-start gap-3">
              <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm">{notification.title}</h4>
                <p className="text-sm opacity-90 mt-1">{notification.message}</p>
              </div>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-70 hover:opacity-100">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
