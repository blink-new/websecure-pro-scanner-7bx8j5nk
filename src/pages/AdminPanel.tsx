import { useState } from 'react'
import { Shield, Users, Activity, AlertTriangle, TrendingUp, Settings, Search, Filter } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Progress } from '../components/ui/progress'

export default function AdminPanel() {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data
  const stats = {
    totalUsers: 2547,
    activeScans: 156,
    totalScans: 45623,
    avgTrustScore: 78,
    criticalIssues: 23,
    revenue: 12450
  }

  const recentUsers = [
    { id: 1, email: 'john@example.com', plan: 'pro', scans: 45, joined: '2024-01-15' },
    { id: 2, email: 'sarah@company.com', plan: 'enterprise', scans: 123, joined: '2024-01-14' },
    { id: 3, email: 'mike@startup.io', plan: 'free', scans: 3, joined: '2024-01-13' }
  ]

  const recentScans = [
    { id: 1, url: 'https://example.com', user: 'john@example.com', score: 85, status: 'completed', time: '2 min ago' },
    { id: 2, url: 'https://mystore.com', user: 'sarah@company.com', score: 72, status: 'completed', time: '5 min ago' },
    { id: 3, url: 'https://blog.site.org', user: 'mike@startup.io', score: 91, status: 'running', time: '8 min ago' }
  ]

  const systemAlerts = [
    { id: 1, type: 'warning', message: 'High API usage detected', time: '10 min ago' },
    { id: 2, type: 'error', message: 'Scan service temporarily unavailable', time: '1 hour ago' },
    { id: 3, type: 'info', message: 'New security rules deployed', time: '2 hours ago' }
  ]

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getPlanBadge = (plan) => {
    switch (plan) {
      case 'enterprise': return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/40">Enterprise</Badge>
      case 'pro': return <Badge className="bg-primary/20 text-primary border-primary/40">Pro</Badge>
      default: return <Badge variant="outline">Free</Badge>
    }
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-400" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      default: return <Activity className="w-4 h-4 text-blue-400" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-primary cyber-glow" />
              <span className="text-xl font-bold gradient-text">Admin Panel</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border/40">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-primary" />
                <div className="text-sm text-muted-foreground">Users</div>
              </div>
              <div className="text-2xl font-bold gradient-text mt-1">
                {stats.totalUsers.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/40">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-blue-400" />
                <div className="text-sm text-muted-foreground">Active Scans</div>
              </div>
              <div className="text-2xl font-bold text-blue-400 mt-1">
                {stats.activeScans}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/40">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <div className="text-sm text-muted-foreground">Total Scans</div>
              </div>
              <div className="text-2xl font-bold text-green-400 mt-1">
                {stats.totalScans.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/40">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-yellow-400" />
                <div className="text-sm text-muted-foreground">Avg Score</div>
              </div>
              <div className="text-2xl font-bold text-yellow-400 mt-1">
                {stats.avgTrustScore}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/40">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <div className="text-sm text-muted-foreground">Critical</div>
              </div>
              <div className="text-2xl font-bold text-red-400 mt-1">
                {stats.criticalIssues}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/40">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <div className="text-sm text-muted-foreground">Revenue</div>
              </div>
              <div className="text-2xl font-bold gradient-text mt-1">
                ${stats.revenue.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="scans">Scans</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest scans and user activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentScans.slice(0, 5).map((scan) => (
                    <div key={scan.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                      <div className="space-y-1">
                        <div className="font-mono text-sm text-primary">{scan.url}</div>
                        <div className="text-xs text-muted-foreground">{scan.user} • {scan.time}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={scan.status === 'completed' ? 'default' : 'secondary'}>
                          {scan.status}
                        </Badge>
                        {scan.status === 'completed' && (
                          <div className={`text-sm font-bold ${getScoreColor(scan.score)}`}>
                            {scan.score}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* System Health */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Current system status and performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>API Response Time</span>
                      <span className="text-green-400">245ms</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Scan Queue</span>
                      <span className="text-yellow-400">12 pending</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Database Load</span>
                      <span className="text-green-400">32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Storage Usage</span>
                      <span className="text-blue-400">1.2TB / 5TB</span>
                    </div>
                    <Progress value={24} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold gradient-text">User Management</h2>
                <p className="text-muted-foreground">Manage user accounts and subscriptions</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Search users..." 
                    className="pl-9 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/40">
                        <th className="text-left p-4 font-medium">User</th>
                        <th className="text-left p-4 font-medium">Plan</th>
                        <th className="text-left p-4 font-medium">Scans</th>
                        <th className="text-left p-4 font-medium">Joined</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user) => (
                        <tr key={user.id} className="border-b border-border/40 hover:bg-muted/20">
                          <td className="p-4">
                            <div className="font-medium">{user.email}</div>
                          </td>
                          <td className="p-4">
                            {getPlanBadge(user.plan)}
                          </td>
                          <td className="p-4">
                            <div className="text-sm">{user.scans} scans</div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm text-muted-foreground">
                              {new Date(user.joined).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">View</Button>
                              <Button variant="ghost" size="sm">Edit</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scans Tab */}
          <TabsContent value="scans" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold gradient-text mb-2">Scan Management</h2>
              <p className="text-muted-foreground">Monitor and manage all security scans</p>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/40">
                        <th className="text-left p-4 font-medium">URL</th>
                        <th className="text-left p-4 font-medium">User</th>
                        <th className="text-left p-4 font-medium">Score</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Time</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentScans.map((scan) => (
                        <tr key={scan.id} className="border-b border-border/40 hover:bg-muted/20">
                          <td className="p-4">
                            <div className="font-mono text-sm text-primary">{scan.url}</div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm">{scan.user}</div>
                          </td>
                          <td className="p-4">
                            {scan.status === 'completed' ? (
                              <div className={`font-bold ${getScoreColor(scan.score)}`}>
                                {scan.score}
                              </div>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </td>
                          <td className="p-4">
                            <Badge variant={scan.status === 'completed' ? 'default' : 'secondary'}>
                              {scan.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="text-sm text-muted-foreground">{scan.time}</div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">View</Button>
                              <Button variant="ghost" size="sm">Retry</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold gradient-text mb-2">System Alerts</h2>
              <p className="text-muted-foreground">Monitor system health and critical issues</p>
            </div>

            <div className="space-y-4">
              {systemAlerts.map((alert) => (
                <Card key={alert.id} className="bg-card/50 backdrop-blur-sm border-border/40">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <div className="font-medium">{alert.message}</div>
                        <div className="text-sm text-muted-foreground">{alert.time}</div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Dismiss
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold gradient-text mb-2">Analytics Dashboard</h2>
              <p className="text-muted-foreground">Detailed insights and performance metrics</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle>Scan Volume</CardTitle>
                  <CardDescription>Daily scan activity over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    Chart placeholder - Scan volume over time
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>New user registrations by plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    Chart placeholder - User growth metrics
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}