import { useState, useEffect } from 'react'
import { Shield, Plus, History, CreditCard, Settings, LogOut, Search, Filter, Download } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Progress } from '../components/ui/progress'
import blink from '../blink/client'
import { toast } from 'sonner'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [scanUrl, setScanUrl] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [scans, setScans] = useState([])
  const [credits, setCredits] = useState(3)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
    })
    return unsubscribe
  }, [])

  const handleNewScan = async () => {
    if (!scanUrl.trim()) {
      toast.error('Please enter a valid URL')
      return
    }

    try {
      new URL(scanUrl)
    } catch {
      toast.error('Please enter a valid URL (include https://)')
      return
    }

    if (credits <= 0) {
      toast.error('No credits remaining. Please upgrade your plan.')
      return
    }

    setIsScanning(true)
    toast.success('Starting comprehensive security & SEO scan...')
    
    // Simulate scan process with enhanced SEO analysis
    setTimeout(() => {
      const newScan = {
        id: `scan_${Date.now()}`,
        url: scanUrl,
        status: 'completed',
        trustScore: Math.floor(Math.random() * 40) + 60,
        securityScore: Math.floor(Math.random() * 30) + 70,
        seoScore: Math.floor(Math.random() * 25) + 75,
        performanceScore: Math.floor(Math.random() * 35) + 65,
        accessibilityScore: Math.floor(Math.random() * 20) + 80,
        createdAt: new Date().toISOString(),
        vulnerabilities: Math.floor(Math.random() * 5) + 1,
        backlinks: Math.floor(Math.random() * 500) + 50,
        socialMentions: Math.floor(Math.random() * 20) + 5,
        spamLinks: Math.floor(Math.random() * 10)
      }
      
      setScans(prev => [newScan, ...prev])
      setCredits(prev => prev - 1)
      setIsScanning(false)
      setScanUrl('')
      toast.success('Comprehensive scan completed successfully!')
      // TODO: Navigate to scan results when routing is implemented
    }, 6000)
  }

  const handleLogout = () => {
    blink.auth.logout()
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreBadgeVariant = (score) => {
    if (score >= 80) return 'default'
    if (score >= 60) return 'secondary'
    return 'destructive'
  }

  // Mock recent scans data
  const recentScans = [
    {
      id: 'scan_1',
      url: 'https://example.com',
      trustScore: 85,
      vulnerabilities: 2,
      createdAt: '2024-01-15T10:30:00Z',
      status: 'completed'
    },
    {
      id: 'scan_2', 
      url: 'https://mystore.com',
      trustScore: 72,
      vulnerabilities: 4,
      createdAt: '2024-01-14T15:45:00Z',
      status: 'completed'
    },
    {
      id: 'scan_3',
      url: 'https://blog.example.org',
      trustScore: 91,
      vulnerabilities: 1,
      createdAt: '2024-01-13T09:15:00Z',
      status: 'completed'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-primary cyber-glow" />
              <span className="text-xl font-bold gradient-text">WebSecure Pro</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <CreditCard className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Credits:</span>
                <Badge variant="outline" className="text-primary border-primary/40">
                  {credits}
                </Badge>
              </div>
              
              <Button variant="ghost" size="sm" onClick={() => toast.info('Settings page coming soon!')}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Welcome back{user?.displayName ? `, ${user.displayName}` : ''}!
          </h1>
          <p className="text-muted-foreground">
            Monitor your website security and performance with comprehensive scans.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Scans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold gradient-text">12</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-border/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Trust Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">82</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-border/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Vulnerabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">7</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-border/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Credits Left</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{credits}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="scan" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="scan">New Scan</TabsTrigger>
            <TabsTrigger value="history">Scan History</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          </TabsList>

          {/* New Scan Tab */}
          <TabsContent value="scan" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5 text-primary" />
                  <span>Start New Security Scan</span>
                </CardTitle>
                <CardDescription>
                  Enter a website URL to perform comprehensive security, SEO, performance, and accessibility analysis including backlinks, social mentions, and spam detection.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    placeholder="https://example.com"
                    value={scanUrl}
                    onChange={(e) => setScanUrl(e.target.value)}
                    className="flex-1 bg-background/50 border-border/60"
                    disabled={isScanning}
                  />
                  <Button 
                    onClick={handleNewScan}
                    disabled={isScanning || credits <= 0}
                    className="cyber-glow min-w-[140px]"
                  >
                    {isScanning ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        Start Scan
                      </>
                    )}
                  </Button>
                </div>
                
                {isScanning && (
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground">
                      Scanning {scanUrl}...
                    </div>
                    <Progress value={45} className="scan-pulse" />
                    <div className="text-xs text-muted-foreground">
                      Running security checks, SEO analysis, backlink audit, social mentions, performance tests, and accessibility validation...
                    </div>
                  </div>
                )}
                
                <div className="text-sm text-muted-foreground">
                  Each scan uses 1 credit • {credits} credits remaining
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scan History Tab */}
          <TabsContent value="history" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold gradient-text">Scan History</h2>
                <p className="text-muted-foreground">View and manage your previous security scans</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search scans..." className="pl-9 w-64" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {recentScans.map((scan) => (
                <Card key={scan.id} className="bg-card/50 backdrop-blur-sm border-border/40 hover:border-primary/40 transition-all duration-300 cursor-pointer"
                      onClick={() => toast.info('Scan details page coming soon!')}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <div className="font-mono text-sm text-primary">{scan.url}</div>
                          <Badge variant={getScoreBadgeVariant(scan.trustScore)}>
                            Trust Score: {scan.trustScore}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>
                            {scan.vulnerabilities} vulnerabilities
                          </span>
                          <span>•</span>
                          <span>
                            {scan.backlinks || 0} backlinks
                          </span>
                          <span>•</span>
                          <span>
                            {scan.socialMentions || 0} mentions
                          </span>
                          <span>•</span>
                          <span>
                            {new Date(scan.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                        <div className={`text-2xl font-bold ${getScoreColor(scan.trustScore)}`}>
                          {scan.trustScore}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Scheduled Scans Tab */}
          <TabsContent value="scheduled" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold gradient-text mb-2">Scheduled Scans</h2>
              <p className="text-muted-foreground">Automate regular security monitoring for your websites</p>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardContent className="p-12 text-center">
                <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Scheduled Scans</h3>
                <p className="text-muted-foreground mb-6">
                  Set up automated scans to monitor your websites continuously
                </p>
                <Button className="cyber-glow">
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule First Scan
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}