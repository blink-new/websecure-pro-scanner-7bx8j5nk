import { Shield, Loader2 } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="relative">
          <Shield className="w-16 h-16 text-primary mx-auto cyber-glow" />
          <div className="absolute inset-0 animate-ping">
            <Shield className="w-16 h-16 text-primary/30 mx-auto" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold gradient-text">WebSecure Pro</h1>
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Initializing security scanner...</span>
          </div>
        </div>
        
        <div className="w-64 h-1 bg-muted rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-primary to-blue-400 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}