import { useState, useEffect } from 'react'
import { Shield, User, CreditCard, Bell, Key, LogOut, Save, ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Switch } from '../components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Separator } from '../components/ui/separator'
import blink from '../blink/client'
import { toast } from 'sonner'

export default function ProfileSettings() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState({
    displayName: '',
    email: '',
    company: '',
    website: ''
  })
  const [notifications, setNotifications] = useState({
    scanComplete: true,
    weeklyReport: true,
    securityAlerts: true,
    marketing: false
  })

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      if (state.user) {
        setUser(state.user)
        setProfile({
          displayName: state.user.displayName || '',
          email: state.user.email || '',
          company: '',
          website: ''
        })
      }
    })
    return unsubscribe
  }, [])

  const handleSaveProfile = async () => {
    setLoading(true)
    try {
      await blink.auth.updateMe({
        displayName: profile.displayName
      })
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    blink.auth.logout()
  }

  const handleUpgrade = () => {
    toast.info('Pricing page coming soon!')
  }

  // Mock data
  const currentPlan = {
    name: 'Free',
    scansUsed: 2,
    scansLimit: 3,
    nextReset: '2024-02-01'
  }

  const apiKeys = [
    { id: 1, name: 'Production API', key: 'sk_live_...abc123', created: '2024-01-15', lastUsed: '2 hours ago' },
    { id: 2, name: 'Development API', key: 'sk_test_...def456', created: '2024-01-10', lastUsed: '1 day ago' }
  ]

  const scanHistory = [
    { id: 1, url: 'https://example.com', score: 85, date: '2024-01-15' },
    { id: 2, url: 'https://mystore.com', score: 72, date: '2024-01-14' },
    { id: 3, url: 'https://blog.site.org', score: 91, date: '2024-01-13' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => toast.info('Dashboard navigation coming soon!')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-primary" />
                <span className="font-bold gradient-text">Profile Settings</span>
              </div>
            </div>
            
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">
                {profile.displayName || 'User'}
              </h1>
              <p className="text-muted-foreground">{profile.email}</p>
            </div>
          </div>
          
          {/* Current Plan */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/40">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="text-primary border-primary/40">
                    {currentPlan.name} Plan
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    {currentPlan.scansUsed}/{currentPlan.scansLimit} scans used this month
                  </div>
                </div>
                <Button onClick={handleUpgrade} className="cyber-glow">
                  Upgrade Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="api">API Keys</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={profile.displayName}
                      onChange={(e) => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
                      placeholder="Your display name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      value={profile.email}
                      disabled
                      className="bg-muted/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={profile.company}
                      onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="Your company name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profile.website}
                      onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile} disabled={loading} className="cyber-glow">
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardHeader>
                <CardTitle>Recent Scan Activity</CardTitle>
                <CardDescription>Your latest security scans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scanHistory.map((scan) => (
                    <div key={scan.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                      <div className="space-y-1">
                        <div className="font-mono text-sm text-primary">{scan.url}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(scan.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-400">{scan.score}</div>
                        <div className="text-xs text-muted-foreground">Trust Score</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Manage your subscription and billing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                  <div>
                    <div className="font-medium">{currentPlan.name} Plan</div>
                    <div className="text-sm text-muted-foreground">
                      {currentPlan.scansUsed} of {currentPlan.scansLimit} scans used
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold gradient-text">$0</div>
                    <div className="text-sm text-muted-foreground">per month</div>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Your scan quota resets on {new Date(currentPlan.nextReset).toLocaleDateString()}
                </div>
                
                <div className="flex space-x-2">
                  <Button onClick={handleUpgrade} className="cyber-glow">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Upgrade to Pro
                  </Button>
                  <Button variant="outline">
                    View Billing History
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
                <CardDescription>Your scanning activity this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Scans Performed</span>
                    <span className="font-bold">{currentPlan.scansUsed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Vulnerabilities Found</span>
                    <span className="font-bold text-yellow-400">7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Trust Score</span>
                    <span className="font-bold text-green-400">82</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Scan Completion</div>
                    <div className="text-sm text-muted-foreground">
                      Get notified when your scans are complete
                    </div>
                  </div>
                  <Switch
                    checked={notifications.scanComplete}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, scanComplete: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Weekly Reports</div>
                    <div className="text-sm text-muted-foreground">
                      Receive weekly security summaries
                    </div>
                  </div>
                  <Switch
                    checked={notifications.weeklyReport}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, weeklyReport: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Security Alerts</div>
                    <div className="text-sm text-muted-foreground">
                      Critical security notifications
                    </div>
                  </div>
                  <Switch
                    checked={notifications.securityAlerts}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, securityAlerts: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Marketing Updates</div>
                    <div className="text-sm text-muted-foreground">
                      Product updates and promotions
                    </div>
                  </div>
                  <Switch
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, marketing: checked }))
                    }
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button className="cyber-glow">
                    <Bell className="w-4 h-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Keys Tab */}
          <TabsContent value="api" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>
                  Manage your API keys for programmatic access
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-end">
                  <Button className="cyber-glow">
                    <Key className="w-4 h-4 mr-2" />
                    Generate New Key
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {apiKeys.map((key) => (
                    <div key={key.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/40">
                      <div className="space-y-1">
                        <div className="font-medium">{key.name}</div>
                        <div className="font-mono text-sm text-muted-foreground">{key.key}</div>
                        <div className="text-xs text-muted-foreground">
                          Created {new Date(key.created).toLocaleDateString()} • Last used {key.lastUsed}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          Copy
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                          Revoke
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>
                  Manage your account security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-medium">Password</div>
                      <div className="text-sm text-muted-foreground">
                        Last changed 30 days ago
                      </div>
                    </div>
                    <Button variant="outline">
                      Change Password
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-medium">Two-Factor Authentication</div>
                      <div className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </div>
                    </div>
                    <Button variant="outline">
                      Enable 2FA
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-medium">Active Sessions</div>
                      <div className="text-sm text-muted-foreground">
                        Manage your active login sessions
                      </div>
                    </div>
                    <Button variant="outline">
                      View Sessions
                    </Button>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-border/40">
                  <div className="space-y-4">
                    <div className="text-sm font-medium text-red-400">Danger Zone</div>
                    <div className="flex items-center justify-between p-4 rounded-lg border border-red-400/20 bg-red-400/5">
                      <div className="space-y-1">
                        <div className="font-medium">Delete Account</div>
                        <div className="text-sm text-muted-foreground">
                          Permanently delete your account and all data
                        </div>
                      </div>
                      <Button variant="destructive">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}