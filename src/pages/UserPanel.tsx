import React, { useState, useEffect, useCallback } from 'react';
import { 
  User, Shield, Search, Heart, MessageCircle, TrendingUp, 
  CreditCard, Settings, Download, Eye, Calendar, Award,
  Plus, RefreshCw, ExternalLink, BarChart3, Globe,
  Zap, Target, Clock, Star, Filter, ArrowRight,
  CheckCircle, XCircle, AlertTriangle, Activity
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import { toast } from '../hooks/use-toast';
import blink from '../blink/client';

interface UserStats {
  totalSubmissions: number;
  totalUpvotes: number;
  totalComments: number;
  totalScans: number;
  creditsUsed: number;
  creditsRemaining: number;
  memberSince: string;
  rank: number;
}

interface Submission {
  id: string;
  name: string;
  tagline: string;
  category: string;
  upvotes: number;
  comments: number;
  views: number;
  status: 'approved' | 'pending' | 'rejected';
  submittedAt: string;
  featured: boolean;
}

interface SecurityScan {
  id: string;
  url: string;
  trustScore: number;
  securityScore: number;
  seoScore: number;
  performanceScore: number;
  vulnerabilities: number;
  status: 'completed' | 'running' | 'failed';
  createdAt: string;
  type: 'security' | 'seo' | 'performance' | 'comprehensive';
}

interface Activity {
  id: string;
  type: 'upvote' | 'comment' | 'submission' | 'scan' | 'feature';
  title: string;
  description: string;
  timestamp: string;
  metadata?: any;
}

const UserPanel: React.FC = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<UserStats | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [scans, setScans] = useState<SecurityScan[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [newScanUrl, setNewScanUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user);
      if (state.user) {
        loadUserData();
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [loadUserData]);

  const loadUserData = useCallback(async () => {
    try {
      const userId = user?.id || 'demo-user';
      
      // Load or initialize user stats from localStorage
      const savedStats = localStorage.getItem(`userStats_${userId}`);
      const defaultStats: UserStats = {
        totalSubmissions: 8,
        totalUpvotes: 247,
        totalComments: 34,
        totalScans: 15,
        creditsUsed: 12,
        creditsRemaining: 8,
        memberSince: '2024-01-15',
        rank: 156
      };
      const userStats = savedStats ? JSON.parse(savedStats) : defaultStats;
      setStats(userStats);

      // Load or initialize submissions from localStorage
      const savedSubmissions = localStorage.getItem(`userSubmissions_${userId}`);
      const defaultSubmissions: Submission[] = [
        {
          id: '1',
          name: 'WebSecure Pro',
          tagline: 'Complete website security scanner',
          category: 'developer-tools',
          upvotes: 247,
          comments: 23,
          views: 1250,
          status: 'approved',
          submittedAt: '2024-01-15T10:30:00Z',
          featured: true
        },
        {
          id: '2',
          name: 'TaskFlow Pro',
          tagline: 'Project management reimagined',
          category: 'productivity',
          upvotes: 156,
          comments: 18,
          views: 670,
          status: 'approved',
          submittedAt: '2024-01-13T14:20:00Z',
          featured: false
        },
        {
          id: '3',
          name: 'AI Content Studio',
          tagline: 'Create stunning content with AI',
          category: 'ai-ml',
          upvotes: 89,
          comments: 12,
          views: 340,
          status: 'pending',
          submittedAt: '2024-01-16T09:15:00Z',
          featured: false
        }
      ];
      const userSubmissions = savedSubmissions ? JSON.parse(savedSubmissions) : defaultSubmissions;
      setSubmissions(userSubmissions);

      // Load or initialize security scans from localStorage
      const savedScans = localStorage.getItem(`userScans_${userId}`);
      const defaultScans: SecurityScan[] = [
        {
          id: 'scan_1',
          url: 'https://websecure.pro',
          trustScore: 85,
          securityScore: 88,
          seoScore: 82,
          performanceScore: 79,
          vulnerabilities: 2,
          status: 'completed',
          createdAt: '2024-01-16T11:30:00Z',
          type: 'comprehensive'
        },
        {
          id: 'scan_2',
          url: 'https://taskflow.pro',
          trustScore: 78,
          securityScore: 75,
          seoScore: 81,
          performanceScore: 72,
          vulnerabilities: 4,
          status: 'completed',
          createdAt: '2024-01-15T16:45:00Z',
          type: 'security'
        },
        {
          id: 'scan_3',
          url: 'https://example-client.com',
          trustScore: 0,
          securityScore: 0,
          seoScore: 0,
          performanceScore: 0,
          vulnerabilities: 0,
          status: 'running',
          createdAt: '2024-01-16T12:00:00Z',
          type: 'seo'
        }
      ];
      const userScans = savedScans ? JSON.parse(savedScans) : defaultScans;
      setScans(userScans);

      // Load or initialize recent activities from localStorage
      const savedActivities = localStorage.getItem(`userActivities_${userId}`);
      const defaultActivities: Activity[] = [
        {
          id: '1',
          type: 'scan',
          title: 'Security scan completed',
          description: 'Comprehensive scan of websecure.pro completed with 85 trust score',
          timestamp: '2024-01-16T11:30:00Z'
        },
        {
          id: '2',
          type: 'upvote',
          title: 'Product upvoted',
          description: 'Your WebSecure Pro received 5 new upvotes',
          timestamp: '2024-01-16T10:15:00Z'
        },
        {
          id: '3',
          type: 'submission',
          title: 'Product submitted',
          description: 'AI Content Studio submitted for review',
          timestamp: '2024-01-16T09:15:00Z'
        },
        {
          id: '4',
          type: 'feature',
          title: 'Product featured',
          description: 'WebSecure Pro was featured on the homepage',
          timestamp: '2024-01-15T14:30:00Z'
        }
      ];
      const userActivities = savedActivities ? JSON.parse(savedActivities) : defaultActivities;
      setActivities(userActivities);

      // Save default data if not exists
      if (!savedStats) localStorage.setItem(`userStats_${userId}`, JSON.stringify(userStats));
      if (!savedSubmissions) localStorage.setItem(`userSubmissions_${userId}`, JSON.stringify(userSubmissions));
      if (!savedScans) localStorage.setItem(`userScans_${userId}`, JSON.stringify(userScans));
      if (!savedActivities) localStorage.setItem(`userActivities_${userId}`, JSON.stringify(userActivities));

    } catch (error) {
      console.error('Failed to load user data:', error);
      toast({
        title: "Error",
        description: "Failed to load user data",
        variant: "destructive"
      });
    }
  }, [user]);

  const handleNewScan = async () => {
    if (!newScanUrl.trim()) {
      toast({
        title: "Missing URL",
        description: "Please enter a valid URL to scan",
        variant: "destructive"
      });
      return;
    }

    try {
      new URL(newScanUrl);
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL (include https://)",
        variant: "destructive"
      });
      return;
    }

    if (stats && stats.creditsRemaining <= 0) {
      toast({
        title: "No credits",
        description: "You need more credits to perform scans. Please upgrade your plan.",
        variant: "destructive"
      });
      return;
    }

    setIsScanning(true);
    toast({
      title: "Scan started",
      description: "Starting comprehensive security and SEO scan..."
    });

    // Simulate scan process
    setTimeout(() => {
      const newScan: SecurityScan = {
        id: `scan_${Date.now()}`,
        url: newScanUrl,
        trustScore: Math.floor(Math.random() * 40) + 60,
        securityScore: Math.floor(Math.random() * 30) + 70,
        seoScore: Math.floor(Math.random() * 25) + 75,
        performanceScore: Math.floor(Math.random() * 35) + 65,
        vulnerabilities: Math.floor(Math.random() * 5) + 1,
        status: 'completed',
        createdAt: new Date().toISOString(),
        type: 'comprehensive'
      };

      setScans(prev => [newScan, ...prev]);
      setStats(prev => prev ? {
        ...prev,
        totalScans: prev.totalScans + 1,
        creditsUsed: prev.creditsUsed + 1,
        creditsRemaining: prev.creditsRemaining - 1
      } : null);
      
      setIsScanning(false);
      setNewScanUrl('');
      
      toast({
        title: "Scan completed",
        description: `Security scan completed with ${newScan.trustScore} trust score`
      });
    }, 5000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'running':
        return <Badge className="bg-blue-100 text-blue-800">Running</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'upvote':
        return <Heart className="w-4 h-4 text-red-500" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case 'submission':
        return <Plus className="w-4 h-4 text-green-500" />;
      case 'scan':
        return <Shield className="w-4 h-4 text-purple-500" />;
      case 'feature':
        return <Star className="w-4 h-4 text-yellow-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Sign In Required</h2>
            <p className="text-gray-600 mb-6">Please sign in to access your user panel</p>
            <Button onClick={() => blink.auth.login()} className="w-full">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl text-gray-900">WebSecure Pro</span>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <span className="text-gray-600">User Panel</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="w-4 h-4 text-orange-500" />
                <span className="text-gray-600">Credits:</span>
                <Badge variant="outline" className="text-orange-600 border-orange-200">
                  {stats?.creditsRemaining || 0}
                </Badge>
              </div>
              
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.displayName?.[0] || user.email?.[0] || 'U'}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user.displayName || 'User'}!
              </h1>
              <p className="text-gray-600">
                Track your submissions, scans, and engagement across the platform
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Your Rank</div>
              <div className="text-2xl font-bold text-orange-600">
                #{stats?.rank || 0}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Plus className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats?.totalSubmissions || 0}</div>
              <div className="text-sm text-gray-600">Submissions</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats?.totalUpvotes || 0}</div>
              <div className="text-sm text-gray-600">Upvotes</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <MessageCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats?.totalComments || 0}</div>
              <div className="text-sm text-gray-600">Comments</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Shield className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats?.totalScans || 0}</div>
              <div className="text-sm text-gray-600">Scans</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <CreditCard className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats?.creditsUsed || 0}</div>
              <div className="text-sm text-gray-600">Credits Used</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {stats?.memberSince ? new Date(stats.memberSince).getFullYear() : '2024'}
              </div>
              <div className="text-sm text-gray-600">Member Since</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="scans">Security Scans</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Submissions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                    Recent Submissions
                  </CardTitle>
                  <CardDescription>Your latest product submissions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {submissions.slice(0, 3).map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{submission.name}</div>
                        <div className="text-sm text-gray-600">{submission.tagline}</div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                          <span>{submission.upvotes} upvotes</span>
                          <span>{submission.comments} comments</span>
                          <span>{submission.views} views</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {getStatusBadge(submission.status)}
                        {submission.featured && (
                          <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab('submissions')}>
                    View All Submissions
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Scans */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-500" />
                    Recent Security Scans
                  </CardTitle>
                  <CardDescription>Your latest website security scans</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {scans.slice(0, 3).map((scan) => (
                    <div key={scan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 font-mono text-sm">{scan.url}</div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                          <span>Trust Score: <span className={getScoreColor(scan.trustScore)}>{scan.trustScore}</span></span>
                          <span>{scan.vulnerabilities} issues</span>
                          <span>{new Date(scan.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {getStatusBadge(scan.status)}
                        <Badge variant="outline" className="text-xs">
                          {scan.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab('scans')}>
                    View All Scans
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <Plus className="w-6 h-6" />
                    <span>Submit Product</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setActiveTab('scans')}>
                    <Shield className="w-6 h-6" />
                    <span>New Scan</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <BarChart3 className="w-6 h-6" />
                    <span>Analytics</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <Settings className="w-6 h-6" />
                    <span>Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Your Submissions</h2>
                <p className="text-gray-600">Manage and track your product submissions</p>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Plus className="w-4 h-4 mr-2" />
                Submit New Product
              </Button>
            </div>

            <div className="space-y-4">
              {submissions.map((submission) => (
                <Card key={submission.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{submission.name}</h3>
                          {getStatusBadge(submission.status)}
                          {submission.featured && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-gray-600 mb-3">{submission.tagline}</p>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{submission.upvotes} upvotes</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{submission.comments} comments</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{submission.views} views</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(submission.submittedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Security Scans Tab */}
          <TabsContent value="scans" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Security Scans</h2>
                <p className="text-gray-600">Monitor website security, SEO, and performance</p>
              </div>
            </div>

            {/* New Scan Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-green-500" />
                  Start New Scan
                </CardTitle>
                <CardDescription>
                  Perform comprehensive security, SEO, and performance analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input
                    placeholder="https://example.com"
                    value={newScanUrl}
                    onChange={(e) => setNewScanUrl(e.target.value)}
                    className="flex-1"
                    disabled={isScanning}
                  />
                  <Button 
                    onClick={handleNewScan}
                    disabled={isScanning || (stats?.creditsRemaining || 0) <= 0}
                    className="min-w-[140px]"
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
                  <div className="mt-4 space-y-2">
                    <div className="text-sm text-gray-600">Scanning {newScanUrl}...</div>
                    <Progress value={60} className="h-2" />
                    <div className="text-xs text-gray-500">
                      Running security checks, SEO analysis, and performance tests...
                    </div>
                  </div>
                )}
                
                <div className="mt-2 text-sm text-gray-500">
                  Each scan uses 1 credit • {stats?.creditsRemaining || 0} credits remaining
                </div>
              </CardContent>
            </Card>

            {/* Scans List */}
            <div className="space-y-4">
              {scans.map((scan) => (
                <Card key={scan.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-mono text-gray-900">{scan.url}</h3>
                          {getStatusBadge(scan.status)}
                          <Badge variant="outline" className="text-xs">
                            {scan.type}
                          </Badge>
                        </div>
                        
                        {scan.status === 'completed' && (
                          <div className="grid grid-cols-4 gap-4 mb-3">
                            <div className="text-center">
                              <div className={`text-lg font-bold ${getScoreColor(scan.trustScore)}`}>
                                {scan.trustScore}
                              </div>
                              <div className="text-xs text-gray-500">Trust Score</div>
                            </div>
                            <div className="text-center">
                              <div className={`text-lg font-bold ${getScoreColor(scan.securityScore)}`}>
                                {scan.securityScore}
                              </div>
                              <div className="text-xs text-gray-500">Security</div>
                            </div>
                            <div className="text-center">
                              <div className={`text-lg font-bold ${getScoreColor(scan.seoScore)}`}>
                                {scan.seoScore}
                              </div>
                              <div className="text-xs text-gray-500">SEO</div>
                            </div>
                            <div className="text-center">
                              <div className={`text-lg font-bold ${getScoreColor(scan.performanceScore)}`}>
                                {scan.performanceScore}
                              </div>
                              <div className="text-xs text-gray-500">Performance</div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4" />
                            <span>{scan.vulnerabilities} vulnerabilities</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(scan.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {scan.status === 'completed' && (
                          <>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View Report
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Export
                            </Button>
                          </>
                        )}
                        {scan.status === 'running' && (
                          <div className="flex items-center gap-2 text-blue-600">
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            <span className="text-sm">Scanning...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Recent Activity</h2>
              <p className="text-gray-600">Your recent actions and achievements</p>
            </div>

            <div className="space-y-4">
              {activities.map((activity) => (
                <Card key={activity.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{activity.title}</div>
                        <div className="text-sm text-gray-600 mt-1">{activity.description}</div>
                        <div className="text-xs text-gray-500 mt-2">
                          {new Date(activity.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Premium Services</h2>
              <p className="text-gray-600">Upgrade your account for advanced features</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Security Pro */}
              <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-6 h-6 text-purple-600" />
                    Security Pro
                  </CardTitle>
                  <CardDescription>Advanced security scanning and monitoring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold text-purple-600">$29/mo</div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Unlimited security scans
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Real-time monitoring
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Advanced vulnerability detection
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Priority support
                    </li>
                  </ul>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Upgrade Now
                  </Button>
                </CardContent>
              </Card>

              {/* SEO Master */}
              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-6 h-6 text-blue-600" />
                    SEO Master
                  </CardTitle>
                  <CardDescription>Comprehensive SEO analysis and optimization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold text-blue-600">$39/mo</div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Unlimited SEO audits
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Backlink analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Keyword tracking
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Competitor analysis
                    </li>
                  </ul>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Upgrade Now
                  </Button>
                </CardContent>
              </Card>

              {/* Enterprise */}
              <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-orange-600" />
                    Enterprise
                  </CardTitle>
                  <CardDescription>Complete solution for teams and agencies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold text-orange-600">$99/mo</div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Everything in Pro plans
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Team collaboration
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      White-label reports
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      API access
                    </li>
                  </ul>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserPanel;