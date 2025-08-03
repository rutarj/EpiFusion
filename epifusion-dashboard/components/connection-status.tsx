// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Wifi, WifiOff, RefreshCw, CheckCircle, XCircle } from "lucide-react"

// interface ConnectionStatusProps {
//   onStatusChange?: (isConnected: boolean) => void
// }

// export function ConnectionStatus({ onStatusChange }: ConnectionStatusProps) {
//   const [isConnected, setIsConnected] = useState<boolean | null>(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const [lastCheck, setLastCheck] = useState<Date | null>(null)

//   const checkConnection = async () => {
//     setIsLoading(true)
//     try {
//       const response = await fetch('http://localhost:5050/api/health')
//       if (response.ok) {
//         setIsConnected(true)
//         onStatusChange?.(true)
//       } else {
//         setIsConnected(false)
//         onStatusChange?.(false)
//       }
//     } catch (error) {
//       setIsConnected(false)
//       onStatusChange?.(false)
//     } finally {
//       setIsLoading(false)
//       setLastCheck(new Date())
//     }
//   }

//   useEffect(() => {
//     checkConnection()
//   }, [])

//   return (
//     <Card className="w-full max-w-sm">
//       <CardHeader className="pb-2">
//         <CardTitle className="flex items-center gap-2 text-sm">
//           {isConnected ? <Wifi className="h-4 w-4 text-green-500" /> : <WifiOff className="h-4 w-4 text-red-500" />}
//           Backend Connection
//           <Badge 
//             variant={isConnected ? "default" : "destructive"}
//             className="ml-auto"
//           >
//             {isConnected ? "Connected" : "Disconnected"}
//           </Badge>
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-3">
//         <div className="flex items-center justify-between text-xs">
//           <span className="text-muted-foreground">Status:</span>
//           <div className="flex items-center gap-1">
//             {isConnected ? (
//               <CheckCircle className="h-3 w-3 text-green-500" />
//             ) : (
//               <XCircle className="h-3 w-3 text-red-500" />
//             )}
//             <span>{isConnected ? "Backend Online" : "Backend Offline"}</span>
//           </div>
//         </div>
        
//         <div className="flex items-center justify-between text-xs">
//           <span className="text-muted-foreground">URL:</span>
//           <span className="font-mono">localhost:5050</span>
//         </div>
        
//         {lastCheck && (
//           <div className="flex items-center justify-between text-xs">
//             <span className="text-muted-foreground">Last Check:</span>
//             <span>{lastCheck.toLocaleTimeString()}</span>
//           </div>
//         )}
        
//         <Button 
//           onClick={checkConnection} 
//           disabled={isLoading}
//           size="sm"
//           variant="outline"
//           className="w-full"
//         >
//           {isLoading ? (
//             <>
//               <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
//               Checking...
//             </>
//           ) : (
//             <>
//               <RefreshCw className="h-3 w-3 mr-1" />
//               Test Connection
//             </>
//           )}
//         </Button>
//       </CardContent>
//     </Card>
//   )
// } 